Inventário E-Lixo - Gestão de Resíduos Eletrônicos

Este projeto é um sistema de gestão de inventário desenvolvido para o descarte correto de resíduos eletrônicos. 

- Acesso às Interfaces

O projeto utiliza uma separação entre rotas de interface e rotas de dados (API):

1. Interfaces de Utilizador (Views Pug)
Para aceder às páginas formatadas e estilizadas, utilize as seguintes URLs:
- Listagem de Empresas: `http://localhost:3000/empresas/lista`
- Listagem de Usuários: `http://localhost:3000/users/lista`

2. API REST (JSON)
As rotas de dados técnicos estão sob o prefixo `/api/elixo/`:
Exemplos: `GET http://localhost:3000/api/elixo/empresas`;
	  `PATCH /api/elixo/users/:id`
