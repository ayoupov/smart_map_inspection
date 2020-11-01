#wget http://download.geofabrik.de/russia/central-fed-district-latest.osm.pbf

#foot
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/foot.lua /data/central-fed-district-latest-foot.osm.pbf
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/central-fed-district-latest-foot.osm.pbf
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/central-fed-district-latest-foot.osm.pbf

