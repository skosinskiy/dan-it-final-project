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