#!/bin/sh
# wait-for-it.sh

# Host and Port of the database from the environment variable or known values
HOST="postgres"
PORT="5432"
TIMEOUT=30
RETRY_INTERVAL=1 # seconds

echo "Waiting for $HOST:$PORT to be available..."

for i in $(seq $TIMEOUT); do
  # Use netcat (nc) to check if the port is open
  nc -z $HOST $PORT && break

  if [ $i -eq $TIMEOUT ]; then
    echo "Timeout reached. $HOST:$PORT is still unavailable."
    exit 1
  fi
  
  sleep $RETRY_INTERVAL
done

echo "$HOST:$PORT is available! Starting application..."
exec "$@" # This line is often removed if the script is called as a separate command
