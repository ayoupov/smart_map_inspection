docker run -t -i -d --name central-foot -p 5001:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/central-fed-district-latest-foot.osrm
