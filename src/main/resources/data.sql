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

INSERT INTO places_categories
  (id, date_created, date_modified, name, multisync)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-category-1', true ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-category-2', false );

INSERT INTO business_categories
  (id, date_created, date_modified, name, parent_category_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-category-1', null ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business-category-2', 1 );

INSERT INTO event_categories
  (id, date_created, date_modified, name, parent_category_id)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-category-1', null ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-category-2', 1 );

INSERT INTO places_photos
  (id, date_created, date_modified, photo)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-1' ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-2' );

INSERT INTO event_photos
  (id, date_created, date_modified, photo)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-1' ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-2' );

INSERT INTO business_photos
  (id, date_created, date_modified, photo)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-1' ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'photo-2' );

INSERT INTO events
  (id, date_created, date_modified, title, description, main_photo, photos, address )
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-1', 'description-1', 1, (1, 2), 'address1' ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'event-2', 'description-2', 2, (1, 2), 'address2' );

INSERT INTO events_categories
  (event_id, category_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);

INSERT INTO businesses
  (id, date_created, date_modified, title, description, address, web_site, phone_number, event_id, main_photo, photos)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business1', 'description-1', 'address1', 'site1.com.ua', '067-123-12-46', 1, 1, (1, 2) ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'business2', 'description-2', 'address2', 'site2.com.ua', '067-123-12-40', (1, 2), 2, (1, 2) );

INSERT INTO businesses_categories
  (business_id, category_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);

INSERT INTO places
  (id, date_created, date_modified, title, description, address, businesses_id, main_photo, photos, events_id, place_category)
VALUES
  (1, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-1', 'description-1', 'address-1', (1, 2), 1,  (1, 2), 1 ),
  (2, '2019-09-16 12:13:00', '2019-09-16 12:13:00', 'place-2', 'description-2', 'address-2', (1, 2), 2,  (1, 2), 2 );