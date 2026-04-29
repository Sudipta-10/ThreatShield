# ThreatShield — CyberGuard AI 2.0

ThreatShield is a state-of-the-art, real-time cybersecurity threat detection platform mapped to a comprehensive four-tier architecture: Ingest, Process, Detect, and Respond.

## 🏗️ Architecture Pipeline

### 1. INGEST
- **Real-time log ingest**: Syslog, NetFlow, PCAP
- **Log Agents**: Filebeat, Fluentd, Endpoint telemetry
- **External Data**: Threat Intel API, Cloud Logs

### 2. PROCESS
- **Feature Engineering + SMOTE**: Handling class imbalance and extracting patterns from raw logs.
- **Stream Processing**: Utilizing Apache Flink, Redis cache, and Schema registry for real-time enrichment and deduplication of Threat Intel and Cloud Logs.

### 3. DETECT
- **Ensemble ML**: Random Forest, XGBoost, Isolation Forest, and LSTM autoencoder.
- **Graph Neural Net (GNN)**: PyTorch Geometric models mapping network topology for lateral movement detection.
- **MITRE ATT&CK**: Automatic mapping of threats to tactics and techniques (e.g., T1059, T1190).
- **XAI / SHAP**: Explainable AI overlay to interpret model decisions and reduce false positives.

### 4. RESPOND
- **Auto Response**: Triggering automated defense mechanisms (SOAR).
- **LLM Analyst**: Converting raw alert JSON into plain-English incident summaries and playbooks.
- **Ticketing**: Integration with Jira and ServiceNow with auto-severity routing.
- **React Dashboard**: A premium, real-time interface visualizing the entire pipeline. Includes a **feedback loop** that routes analyst actions back into the Stream Processing engine to refine future detections.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Recharts, Vanilla CSS
- **Backend**: Python, FastAPI, Uvicorn, Pydantic V2
- **Database**: PostgreSQL (with TimescaleDB extension), SQLAlchemy
- **Streaming**: Apache Kafka, Zookeeper
- **Caching**: Redis

## ⚙️ Local Development Setup

### 1. Start the Infrastructure
Spin up PostgreSQL, Redis, Kafka, and Zookeeper using Docker Compose:
```bash
docker-compose up -d
```

### 2. Start the Backend API
Navigate to the `backend` directory, create a virtual environment, and install dependencies:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --port 8001 --reload
```

### 3. Start the Real-Time Streaming Pipeline
In separate terminal windows (with the virtual environment activated), start the processing engine and the mock network log producer:
```bash
# Terminal 1: Start the simulated ML Processor
python app/streaming/processor.py

# Terminal 2: Start the Kafka Log Generator
python app/streaming/producer.py
```

### 4. Start the Frontend Dashboard
Navigate to the `frontend` directory, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
Access the premium SOC dashboard at: `http://localhost:5173`
