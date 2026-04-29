import json
import time
import requests
from confluent_kafka import Consumer, KafkaError

API_URL = "http://localhost:8001/api/alerts/"

c = Consumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'threatshield-processor-group',
    'auto.offset.reset': 'earliest'
})

c.subscribe(['raw-network-logs'])

print("Starting Python Processor Engine (Simulating Flink + ML)...")

try:
    while True:
        msg = c.poll(1.0)
        
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(msg.error())
                break

        log = json.loads(msg.value().decode('utf-8'))
        
        # Simulated "ML Pipeline" Rules
        is_anomaly = False
        alert_data = {}

        if log['failed_logins'] > 5:
            is_anomaly = True
            alert_data = {
                "type": "HIGH",
                "title": "Brute Force Attack Detected",
                "desc": f"Multiple failed logins ({log['failed_logins']}) targeting {log['dst_ip']}",
                "score": 0.89,
                "technique": "T1110"
            }
        elif log['payload_len'] > 3500:
            is_anomaly = True
            alert_data = {
                "type": "CRITICAL",
                "title": "Data Exfiltration Attempt",
                "desc": f"Large payload ({log['payload_len']} bytes) transferred to unusual external IP {log['src_ip']}",
                "score": 0.95,
                "technique": "T1048"
            }

        if is_anomaly:
            print(f"[!] Anomaly Detected: {alert_data['title']} - Dispatching to PostgreSQL...")
            try:
                requests.post(API_URL, json=alert_data)
            except Exception as e:
                print(f"Failed to save alert: {e}")

except KeyboardInterrupt:
    print("Processor stopped.")
finally:
    c.close()
