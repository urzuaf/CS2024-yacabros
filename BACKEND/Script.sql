create table usuario (
	email text primary key,
	username text,
	password text,
	descripcion text,
	fnacimiento date,
	rol text
);

insert into usuario values ('accidentallygadzooks@mail.com', 'accidentallygadzooks', 'apassword', 'me gusta el chocolate', '1998-12-23', 'usuario' );
insert into usuario values ('projectround@mail.com', 'projectround', 'ppassword', 'me gusta el chocolate', '1995-12-23', 'usuario' );
insert into usuario values ('butsincebrook@mail.com', 'butsincebrook', 'bpassword', 'me gusta el chocolate', '1987-08-07', 'usuario' );
insert into usuario values ('incompatible@mail.com', 'incompatible', 'ipassword', 'me gusta el chocolate', '1998-01-10', 'usuario' );
insert into usuario values ('retrospect@mail.com', 'retrospect', 'rpassword', 'me gusta el chocolate', '1998-05-10', 'usuario' );
insert into usuario values ('opposite@mail.com', 'opposite', 'opassword', 'me gusta el chocolate', '1999-01-26', 'usuario' );
insert into usuario values ('indeed@mail.com', 'indeed', 'ipassword', 'me gusta el chocolate', '1998-06-01', 'usuario' );
insert into usuario values ('fooey@mail.com', 'fooey', 'fpassword', 'me gusta el chocolate', '1998-10-12', 'usuario' );
insert into usuario values ('unwitting@mail.com', 'unwitting', 'upassword', 'me gusta el chocolate', '1998-12-14', 'usuario' );
insert into usuario values ('howshirtdress@mail.com', 'howshirtdress', 'hpassword', 'me gusta el chocolate', '2001-10-21', 'usuario' );
insert into usuario values ('staff1@mail.com', 'staff1', 'staff', 'me gusta staffear', '1998-12-14', 'staff' );
insert into usuario values ('creador1@mail.com', 'creador1', 'creador', 'me gusta crear', '2001-10-21', 'creador' );
insert into usuario values ('admin@admin.com', 'admin', 'admin', 'me gusta administrar', '2000-02-22', 'admin' );