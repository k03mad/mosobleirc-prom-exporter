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
— [Import Grafana dashboard](grafana)

[grafana-dashboards](https://github.com/k03mad/grafana-dashboards/tree/master/export)
