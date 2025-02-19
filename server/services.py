from nameko.rpc import rpc
from nameko.runners import ServiceRunner
from pymongo import MongoClient
from typing import List, Dict, Optional

class ExamDB(ServiceRunner):  # Inherit from Service
    name = "exam_service"

    def __init__(self):
        self.client = MongoClient("mongodb+srv://shabeebmuhammedk98:root@cluster0.r0y4m.mongodb.net/")
        self.db = self.client["exam_db"]
        self.questions_collection = self.db["questions"]
        self.subjects_collection = self.db["subjects"]

    @rpc
    def add_mcq_question(self, subject, question_text, options, correct_option, weightage):
        question_data = {
            "subject": subject,
            "question_type": "mcq",
            "question_text": question_text,
            "options": options,
            "correct_option": correct_option,
            "weightage": weightage
        }
        result = self.questions_collection.insert_one(question_data)   
        return str(result.inserted_id)

    @rpc
    def add_descriptive_question(self, subject, question_text, ideal_keywords, weights):
        question_data = {
            "subject": subject,
            "question_type": "descriptive",
            "question_text": question_text,
            "ideal_keywords": ideal_keywords,
            "weights": weights or [1] * len(ideal_keywords)
        }
        result = self.questions_collection.insert_one(question_data)
        return str(result.inserted_id)

    @rpc
    def get_subjects(self, query=None):
        """Retrieve data from MongoDB"""
        if query is None:
            query = {}
        results = list(self.subjects_collection.find(query))
        # Convert ObjectId to string for JSON serialization
        for result in results:
            result["_id"] = str(result["_id"])
        return results
    

    @rpc
    def add_subject(self, subject: str):
        """Add a new subject to the subjects collection, avoiding duplicates."""
        subject = subject.strip()
        if not subject:
            raise ValueError("Subject name cannot be empty.")
        
        # Check if the subject already exists
        existing_subject = self.subjects_collection.find_one({"subject": subject})
        if existing_subject:
            return "Subject already exists."
        
        # Insert the new subject into the collection
        subject_data = {"subject": subject}
        result = self.subjects_collection.insert_one(subject_data)
        return str(result.inserted_id)
    


    @rpc
    def get_questions(self, query=None):
        """Retrieve data from MongoDB"""
        if query is None:
            query = {}
        results = list(self.questions_collection .find(query))
        # Convert ObjectId to string for JSON serialization
        for result in results:
            result["_id"] = str(result["_id"])
        return results
