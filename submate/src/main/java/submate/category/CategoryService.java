package submate.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toCategoryDTO).toList();
    }

    public void createCategory(CategoryDTO request) {
        Category category = categoryMapper.toCategory(request);
        categoryRepository.save(category);
    }
}
