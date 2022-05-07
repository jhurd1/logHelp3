package Model;

import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

/*******************************
 * SEARCHRESULTS ENTITY
 * Contains the results of the
 * search.
 *******************************/
@DynamicUpdate
public class SearchResults
{
    /*******************************
     * Data Members
     *******************************/
    private Long id;
    private SortedSet s = Collections.synchronizedSortedSet(new TreeSet<String>());
    /*******************************
     * Constructors
     *******************************/
    public SearchResults(Long id, SortedSet s)
    {
        this.id = id;
        this.s = s;
    }
    /*******************************
     * Accessors and Mutators
     *******************************/
    @Column(name="RESULTS_ID")
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

    public SortedSet getS()
    {
        return s;
    }

    public void setS(SortedSet s)
    {
        this.s = s;
    }
}
