package submate.category;

import org.springframework.stereotype.Service;

@Service
public class CategoryMapper {
    public Category toCategory(CategoryDTO categoryDTO) {
        return Category.builder().name(categoryDTO.name()).build();
    }

    public CategoryDTO toCategoryDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }
}