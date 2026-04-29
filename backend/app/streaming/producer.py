import json
import time
import random
from confluent_kafka import Producer

def delivery_report(err, msg):
    if err is not None:
        print(f"Message delivery failed: {err}")

p = Producer({'bootstrap.servers': 'localhost:9092'})
TOPIC = 'raw-network-logs'

print("Starting Mock Network Log Producer...")

try:
    while True:
        log = {
            "src_ip": f"{random.randint(10, 192)}.{random.randint(0, 255)}.x.x",
            "dst_ip": f"10.0.4.{random.randint(10, 100)}",
            "payload_len": random.randint(64, 4096),
            "failed_logins": random.randint(0, 10) if random.random() > 0.8 else 0,
            "timestamp": time.time()
        }
        
        p.produce(TOPIC, json.dumps(log).encode('utf-8'), callback=delivery_report)
        p.poll(0)
        
        # Send ~1-2 logs per second
        time.sleep(random.uniform(0.5, 1.5))
except KeyboardInterrupt:
    print("Producer stopped.")
    p.flush()
