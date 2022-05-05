package Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.persistence.Basic;

/********************************
 * CONNECTIONS CLASS
 * Replace generics with table name(s)
 * once entities are in place.
 */
public class Connections
{
    private BasicDataSource connectionPool;

    public void getConnection() throws URISyntaxException, SQLException
    {
        URI dbUri = new URI(System.getenv("DATABASE_URL")); //alt: "DATABASE_URL"
        String dbUrl = "jdbc:postgresql://localhost:5432/logHelp3" + dbUri.getHost() + dbUri.getPath();
        connectionPool = new BasicDataSource();

        if(dbUri.getUserInfo() != null)
        {
            connectionPool.setUsername(dbUri.getUserInfo().split(":")[0]);
            connectionPool.setPassword(dbUri.getUserInfo().split(":")[1]);
        }
        connectionPool.setDriverClassName("org.postgresql.Driver");
        connectionPool.setUrl(dbUrl);
        connectionPool.setInitialSize(1);
    }

    public void retrieveConnection() throws SQLException
    {
        Connection connection = connectionPool.getConnection();
        Statement statement = connection.createStatement();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)");
        statement.executeUpdate("INSERT INTO <yourtable> VALUES (now())");
        ResultSet rs = statement.executeQuery("SELECT whatnot FROM <yourtable>");
        while (rs.next()) {
            System.out.println("Read from DB: " + rs.getTimestamp("tick") + "\n");
        }
    }
}
