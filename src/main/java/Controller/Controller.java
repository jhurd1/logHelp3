package Controller;

import Model.Search;
import Repository.SearchRepositoryImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/searches")
public class Controller
{
    @GetMapping("/{id}")
    public Long getSearch(@PathVariable Long id)
    {
        SearchRepositoryImpl newOne = new SearchRepositoryImpl();
        return newOne.getSearchById(id);
    }
}
