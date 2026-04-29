import requests
import time

API_URL = "http://localhost:8001/api/alerts/"

mock_alerts = [
    { "type": "CRITICAL", "title": "Lateral Movement Detected", "desc": "Suspicious SMB traffic from 10.0.4.12 to 10.0.4.55 (Domain Controller)", "score": 0.94, "technique": "T1021" },
    { "type": "HIGH", "title": "Ransomware Behavior", "desc": "Mass file encryption detected on Host-Win-Dev-09", "score": 0.88, "technique": "T1486" },
    { "type": "MEDIUM", "title": "Unusual Login", "desc": "Multiple failed logins for admin from Tor exit node", "score": 0.65, "technique": "T1078" },
    { "type": "INFO", "title": "Configuration Change", "desc": "Firewall rule modified by user: j.doe", "score": 0.12, "technique": "T1562" },
]

print("Seeding alerts to backend...")
for alert in mock_alerts:
    response = requests.post(API_URL, json=alert)
    if response.status_code == 200:
        print(f"Successfully seeded: {alert['title']}")
    else:
        print(f"Failed to seed: {response.text}")
    time.sleep(0.5)
