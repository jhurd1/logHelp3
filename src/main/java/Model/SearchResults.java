package Model;

import org.hibernate.annotations.DynamicUpdate;

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
    //https://docs.oracle.com/javase/8/docs/api/java/util/TreeSet.html
    private SortedSet s = Collections.synchronizedSortedSet(new TreeSet<String>());
    /*******************************
     * Constructors
     *******************************/

    /*******************************
     * Accessors and Mutators
     *******************************/
}
