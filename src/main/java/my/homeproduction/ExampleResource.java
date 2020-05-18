package my.homeproduction;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.List;

@Path("/hello")
public class ExampleResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Dummy> hello() {


        return Arrays.asList(new Dummy("Paul","199 cm", "22"), new Dummy("Edward", "154 cm", "76"), new Dummy("Rosemary", "180 cm", "31"));
    }
}