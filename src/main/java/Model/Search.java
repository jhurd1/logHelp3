package Model;

import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;

/*******************************
 * SEARCH ENTITY
 * Contains the elements used
 * in the search.
 *******************************/
@DynamicUpdate
public class Search
{
    /*******************************
     * Data Members
     *******************************/
    private Long id;
    private ArrayList<String> searchStrings;
    private boolean anonymize;
    private String fpath;

    /*******************************
     * Constructors
     *******************************/
    public Search(Long id, ArrayList<String> searchStrings, boolean anonymize, String fpath)
    {
        this.id = id;
        this.searchStrings = searchStrings;
        this.anonymize = anonymize;
        this.fpath = fpath;
    }

    /*******************************
     * Accessors and Mutators
     *******************************/
    @Id
    @Column(name = "SEARCH_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    @Column(name = "SEARCH_STRINGS")
    public ArrayList<String> getSearchStrings()
    {
        return searchStrings;
    }

    public void setSearchStrings(ArrayList<String> searchStrings)
    {
        this.searchStrings = searchStrings;
    }

    public boolean isAnonymize()
    {
        return anonymize;
    }

    public void setAnonymize(boolean anonymize)
    {
        this.anonymize = anonymize;
    }

    @Column(name = "FILE_PATH")
    public String getFpath()
    {
        return fpath;
    }

    public void setFpath(String fpath)
    {
        this.fpath = fpath;
    }
}
