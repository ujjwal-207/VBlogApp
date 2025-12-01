
HOST="postgres"
PORT="5432"
TIMEOUT=30
RETRY_INTERVAL=1

echo "Waiting for $HOST:$PORT to be available..."

for i in $(seq $TIMEOUT); do
  nc -z $HOST $PORT && break

  if [ $i -eq $TIMEOUT ]; then
    echo "Timeout reached. $HOST:$PORT is still unavailable."
    exit 1
  fi
  
  sleep $RETRY_INTERVAL
done

echo "$HOST:$PORT is available! Starting application..."
exec "$@"
