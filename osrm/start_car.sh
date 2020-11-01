docker run -t -i -d --name central-car -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/central-fed-district-latest.osrm
