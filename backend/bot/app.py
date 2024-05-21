from flask import Flask, request, jsonify
from flask_cors import CORS
from crewai import Agent, Task, Process, Crew
from langchain_google_genai import ChatGoogleGenerativeAI
import json
api_key = "your api key"
app = Flask(__name__)
CORS(app)
with open('C:/Users/satheesh k/OneDrive/Desktop/bus/backend/bot/data.txt', 'r') as file:
    bus_data = file.read()
print(bus_data)
@app.route('/process', methods=['POST'])
def process_input():
    data = request.json
    print(data)
    nlp = data
    agent_nlp_sql = Agent(
        role = 'Kongu Engineering College bus transport department assistant',
        goal = 'Generate a answer according to the answer from given context.',
        backstory = 'You are a bus transport department assistant who is well versed in understanding managing the bus transport system and answering user query',
        verbose =False,
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",verbose=True,temperature=0.1, google_api_key=api_key
        )
    )
    nlp_task = Task(
        
        description = f"generate a answer based on the input from the user and make sure the data is accurate and only taken from the given context txt file {bus_data.strip()},, here's the query : {nlp}",
        agent = agent_nlp_sql,
        expected_output="Generated expected output in simple english language",
    )
    crew = Crew(
        agents = [agent_nlp_sql],
        tasks = [nlp_task],
        verbose = False,
    )
    op = crew.kickoff()
    print(op)
    output = op  # Replace with actual output
    print(output)
    print(type(output))
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)
