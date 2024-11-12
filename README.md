# My_ChatBot

This project implements a chatbot designed to answer questions about your resume and work experience conversationally. Using RAG (Retrieval-Augmented Generation), the bot leverages a knowledge base to respond with accurate, context-aware information about your professional background.

## Tech Stack

  - **Frontend**: React
  - **Backend**: Flask
  - **Reverse Proxy**: Nginx
  - **Containerization & Orchestration**: Docker & Docker Compose
  - **Language Model**: Llama 3.2:3B (Meta)

## Prerequisites

Make sure the following are installed before proceeding:
  - **Docker**: for containerization
  - **Docker Compose**: to run and orchestrate the containers
  - **Ollama**: required for interacting with the Llama 3.2:3B model

## Getting Started

Follow these steps to set up and run the application locally:

2. **Clone this repository**: Download the project to your local machine.
   ```bash
   git clone https://github.com/Mateorovere/My_ChatBot.git
   cd My_ChatBot

3. **Build and Run with Docker Compose:**

    ```bash
    docker-compose up --build

4. **Access the Chatbot:** Open your web browser and go to http://localhost:3000/.

## Project Overview
 This chatbot integrates a Llama 3.2:3B model, using Ollama to interact with a custom knowledge base of your resume and professional experience. This setup enables thebot to provide factual, in-depth responses to user queries about your skills, projects, and work history.

## Key Features
- Contextual Responses: The chatbot can handle various questions about your background by retrieving relevant information and generating appropriate responses.
- Retrieval-Augmented Generation (RAG): Uses RAG to improve response accuracy by drawing from a curated knowledge base of your resume data.
- Interactive UI: The React frontend provides a user-friendly interface, allowing users to engage conversationally with the chatbot.