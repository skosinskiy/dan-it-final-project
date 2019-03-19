INSERT INTO users
  (id, date_created, date_modified, age, email, first_name, gender, last_name, password, photo)
VALUES
  (1, '2019-03-12 12:00:00', '2019-03-12 12:01:00', 24, 'first.user@test.com', 'Elon', 0, 'Musk', 'secret_pass', 'empty'),
  (2, '2019-03-13 13:00:00', '2019-03-13 13:01:00', 25, 'first.user@test2.com', 'Mark', 0, 'Zuckerberg', 'secret_pass2', 'empty');

INSERT INTO roles
  (id, date_created, date_modified, name)
VALUES
  (1, '2019-03-12 14:00:00', '2019-03-13 14:01:00', 'admin'),
  (2, '2019-03-13 15:00:00', '2019-03-13 15:01:00', 'super-admin');

INSERT INTO users_roles
  (user_id, role_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);

-- places

INSERT INTO places_categories
  (id, date_created, date_modified, name, multisync)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-category-1', true ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-category-2', false );

INSERT INTO places
  (id, date_created, date_modified, title, description, address, place_category)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-1', 'description-1', 'address-1', 1 ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-2', 'description-2', 'address-2', 2 );

INSERT INTO places_photos
  (id, date_created, date_modified, photo, place_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-1', 1),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-2', 1),
  (3, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-3', 2),
  (4, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-4', 2);

-- businesses

INSERT INTO business_categories
  (id, date_created, date_modified, name, parent_category_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-category-1', null ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-category-2', 1 );

INSERT INTO businesses
  (id, date_created, date_modified, title, description, address, web_site, phone_number, place_id )
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-1', 'description-1', 'address1', 'site1.com.ua', '067-123-12-46', 1 ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-2', 'description-2', 'address2', 'site2.com.ua', '067-123-12-40', 2 ),
  (3, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-3', 'description-3', 'address3', 'site3.com.ua', '067-123-12-49', 1 );

INSERT INTO business_photos
  (id, date_created, date_modified, photo, business_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-1', 1 ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-2', 1 ),
  (3, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-3', 2 ),
  (4, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-4', 2 );

INSERT INTO businesses_categories
  (business_id, category_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);

-- events

INSERT INTO event_categories
  (id, date_created, date_modified, name, parent_category_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-category-1', null ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-category-2', 1 );

INSERT INTO events
  (id, date_created, date_modified, title, description, business_id, place_id, address )
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-1', 'description-1', 1, 1, 'address1' ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-2', 'description-2', 2, 2, 'address2' );

INSERT INTO event_photos
  (id, date_created, date_modified, photo, event_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-1', 1 ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-2', 1 ),
  (3, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-3', 2 ),
  (4, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-4', 2 );
INSERT INTO events_categories
  (event_id, category_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);

-- notifications

INSERT INTO notifications
  (id, date_created, date_modified, text, place_id, business_id, event_id )
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'text-1', 1, 1, 1 ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'text-2', 2, 2, 2 );
