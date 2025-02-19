from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, validator
from nameko.standalone.rpc import ClusterRpcProxy
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONFIG = {"AMQP_URI": "pyamqp://guest:guest@localhost"}

# Dependency injection for Nameko RPC
async def get_rpc():
    with ClusterRpcProxy(CONFIG) as rpc:
        yield rpc

class QueryModel(BaseModel):
    name: str 

# Pydantic models for validation
class QuestionMCQ(BaseModel):
    subject: str
    question_type: str
    question_text: str
    options: List[str]
    correct_option: str
    weightage: int

    @validator('subject')
    def validate_subject(cls, v):
        if not v.strip():
            raise ValueError("Subject cannot be empty.")
        return v

    @validator('options')
    def validate_options(cls, v):
        if len(v) < 2:
            raise ValueError("At least two options are required.")
        return v

    @validator('correct_option')
    def validate_correct_option(cls, v, values):
        if 'options' in values and v not in values['options']:
            raise ValueError("Correct option must be one of the provided options.")
        return v

class QuestionDescriptive(BaseModel):
    subject: str
    question_type: str
    question_text: str
    ideal_keywords: List[str]
    weights: Optional[List[int]] = None

    @validator('subject')
    def validate_subject(cls, v):
        if not v.strip():
            raise ValueError("Subject cannot be empty.")
        return v

# API Endpoints
@app.get("/subjects")
def get_all_subjects():
    with ClusterRpcProxy(CONFIG) as rpc:
        subjects = rpc.exam_service.get_subjects()
        return {"subjects": subjects}

@app.post("/add-question-mcq")
def add_question_mcq(question: QuestionMCQ, rpc=Depends(get_rpc)):
    try:
        question_id = rpc.exam_service.add_mcq_question(
            question.subject,
            question.question_text,
            question.options,
            question.correct_option,
            question.weightage
        )
        return {"message": "MCQ question added successfully!", "id": question_id}
    except Exception as e:
        return {"error": f"Failed to add MCQ question: {str(e)}"}, 500

@app.post("/add-question-descriptive")
def add_question_descriptive(question: QuestionDescriptive, rpc=Depends(get_rpc)):
    try:
        question_id = rpc.exam_service.add_descriptive_question(
            question.subject,
            question.question_text,
            question.ideal_keywords,
            question.weights
        )
        return {"message": "Descriptive question added successfully!", "id": question_id}
    except Exception as e:
        return {"error": f"Failed to add descriptive question: {str(e)}"}, 500



@app.post("/add-subject")
def add_subject(subject: QueryModel, rpc=Depends(get_rpc)):
    try:
        subject_id = rpc.exam_service.add_subject(subject.name)
        return {"message": "Subject added successfully!", "id": subject_id}
    except ValueError as e:
        return {"error": str(e)}, 400  # 400 for bad request when subject already exists
    except Exception as e:
        return {"error": f"Failed to add subject: {str(e)}"}, 500

    
@app.get("/show-questions")
def get_all_questions():
    with ClusterRpcProxy(CONFIG) as rpc:
        questions = rpc.exam_service.get_questions()
        return {"questions": questions}
