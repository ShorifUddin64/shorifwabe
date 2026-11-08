#!/bin/sh
cd "$(dirname "$0")"
echo "Open http://localhost:8000  (Ctrl+C to stop)"
(command -v open >/dev/null && open http://localhost:8000) || (command -v xdg-open >/dev/null && xdg-open http://localhost:8000)
python3 -m http.server 8000
