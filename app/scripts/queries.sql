-- Login
SELECT * FROM USERS WHERE email = "user1@example.com"

-- Specialists list
SELECT * FROM professionals

-- Filters
SELECT * FROM insurances
SELECT * FROM specialties
SELECT professional_id, first_name, last_name FROM professionals -- Otra opcion es usar LIKE, pero en dicho caso buscar ahorrarse los % para evitar una busqueda costosa

-- Specalist
SELECT * FROM professionals WHERE professional_id = 1

-- Availabilities for specialist
-- Buscar como joraca relacionar un many to many