#wget http://download.geofabrik.de/russia/central-fed-district-latest.osm.pbf

#car
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/central-fed-district-latest.osm.pbf
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/central-fed-district-latest.osm.pbf
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/central-fed-district-latest.osm.pbf

