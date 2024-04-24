-- PRIMERA SEMANA

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

-- SEGUNDA SEMANA

-- Agregamos 2 más de cada tipo para pruebas
insert into usuario values ('staff2@mail.com', 'staff2', 'staff2', 'me gusta staffear', '1998-12-14', 'staff' );
insert into usuario values ('creador2@mail.com', 'creador2', 'creador2', 'me gusta crear', '2001-10-21', 'creador' );
insert into usuario values ('admin2@admin.com', 'admin2', 'admin2', 'me gusta administrar', '2000-02-22', 'admin' );

-- Creamos tabla torneos

create table torneo (
-- que el id sea serial implica que no hay que agregarlo cuando se cree un torneo, es automatico.
id serial primary key,
nombre text,
bases text,
finicio date,
ftermino date,
premio text,
deporte text,
formato text,
creador text references usuario(email) on update cascade on delete cascade
);

insert into torneo (nombre, bases, finicio, ftermino, premio, deporte, formato, creador)values ('Torneo1','sin bases', '2024-04-20', '2024-08-10', '20.000 USD', 'ajedrez', 'bracket', 'creador1@mail.com' );

-- creamos la tabla para los equipos
create table equipo(
id  serial primary key,
nombre text,
descripcion text,
deporte text,
staff text references usuario(email) on update cascade on delete cascade
);
insert into equipo(nombre,descripcion,deporte,staff) values ('Equipo1', 'somos el equipo 1', 'ajedrez', 'staff1@mail.com')

create table integrante(
	id serial primary key,
	nombre text,
	equipo serial references equipo(id) on update cascade on delete cascade
);

insert into integrante (nombre, equipo) values ('integrante generico 1', 1);
insert into integrante (nombre, equipo) values ('integrante generico 2', 1);
insert into integrante (nombre, equipo) values ('integrante generico 3', 1);


create table solicitud(
	id serial primary key,
	descripcion text,
	visto bool, -- es true si el usuario ha abierto la notificacion
	estado text, -- aceptada si el usuario acepto la solicitud, rechazada si la rechazo, pendiente si ninguna
emisor text references usuario(email) on delete cascade on update cascade, -- quien envia la solicitud
destinatario text references usuario(email) on delete cascade on update cascade -- quien recibe la solicitud

);

insert into solicitud (descripcion, visto, estado, emisor, destinatario)
values ('Quiero invitarte al torneo 1', false, 'pendiente', 'creador1@mail.com', 'staff1@mail.com' );
insert into solicitud (descripcion, visto, estado, emisor, destinatario)
values ('Quiero invitarte al torneo 1', false, 'pendiente', 'creador1@mail.com', 'staff2@mail.com' );


-- Semana 3

--se modifico la creacion de la tabla foro para integrar la columna de foro

CREATE TABLE foro (
    id serial PRIMARY KEY,
    titulo TEXT,
    fecha_creacion DATE,
    creado_por TEXT REFERENCES usuario(email) ON UPDATE CASCADE ON DELETE CASCADE,
    etiqueta TEXT
);

insert into foro (titulo, fecha_creacion, creado_por, etiqueta) values ('Primer Foro Generico', '2024-04-20', 'admin@admin.com', 'sin etiqueta');

create table comentario (
	id serial primary key,
	texto text,
	autor text references usuario(email) on update cascade on delete cascade,
	pertenece_a serial references foro(id) on update cascade on delete cascade
);

insert into comentario (texto, autor, pertenece_a) values ('El primer comentario siempre es el peor jaja', 'staff1@mail.com', 1);

