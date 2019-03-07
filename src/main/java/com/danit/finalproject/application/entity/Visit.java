package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "visits")
@Data
@NoArgsConstructor
public class Visit extends BaseEntity {
    private Date date_finish;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "visit", fetch = FetchType.LAZY)
    private List<VisitAction> actions;
}
