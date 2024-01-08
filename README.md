• [ctrld-prom-exporter](https://github.com/k03mad/ctrld-prom-exporter) \
• [mik-prom-exporter](https://github.com/k03mad/mik-prom-exporter) \
• mosobleirc-prom-exporter \
• [tin-invest-prom-exporter](https://github.com/k03mad/tin-invest-prom-exporter) \
• [ya-iot-prom-exporter](https://github.com/k03mad/ya-iot-prom-exporter)

# [MosOblEIRC — Prometheus] exporter

— [Use correct Node.JS version](.nvmrc) \
— Start exporter:

```bash
# one time
npm run setup

# start app
npm run start --phone=+71230001122 --password=123 --port=11000
# or with envs
MOSOBLEIRC_PHONE=+71230001122 MOSOBLEIRC_PASSWORD=123 MOSOBLEIRC_EXPORTER_PORT=11000 npm run start
```

— Update Prometheus `scrape_configs` \
— [Import Grafana dashboard](grafana.json)
