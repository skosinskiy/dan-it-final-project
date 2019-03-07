package com.danit.finalproject.application.entity.buseness;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "business_subcategories")
@Data
@NoArgsConstructor
public class BusinessSubcategory extends BaseEntity {
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_category")
    private BusinessCategory parentCategory;

    @ManyToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Business> businesses;
}
