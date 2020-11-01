package org.panaggelica.xls_json_sieve.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;
import org.n52.jackson.datatype.jts.GeometryDeserializer;
import org.n52.jackson.datatype.jts.GeometrySerializer;

@Data
public class ODHObjectDescriptor {
    String name;
    //"root_id": 656513337, "distance": 146.1, "end_date": "3000-01-01", "geometry":
    Long root_id;
    Long object_id;
    double distance;
    String start_date;
    String end_date;
    @JsonSerialize(using = GeometrySerializer.class)
    @JsonDeserialize(contentUsing = GeometryDeserializer.class)
    Geometry geometry;
    ODHCalcAttributes calc_attribute;
    double declare_length;


}
