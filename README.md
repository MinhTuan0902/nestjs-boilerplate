### Folder structure
<pre>
📦src
 ┣ 📂apps
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📂steps -> All Migration steps will be here
 ┃ ┃ ┗ 📜migration.module.ts -> Migration module
 ┃ ┣ 📂modules -> API modules
 ┃ ┃ ┣ 📂auth -> Auth module, this is an example of API modules
 ┃ ┃ ┃ ┣ 📂controllers -> Auth controllers
 ┃ ┃ ┃ ┣ 📂decorators -> Auth decorators
 ┃ ┃ ┃ ┣ 📂errors -> Auth API errors
 ┃ ┃ ┃ ┣ 📂event-handlers -> Handle Auth events
 ┃ ┃ ┃ ┣ 📂guards -> Auth guards
 ┃ ┃ ┃ ┣ 📂helpers -> Auth Module helpers
 ┃ ┃ ┃ ┣ 📂inputs -> Auth GraphQL inputs
 ┃ ┃ ┃ ┣ 📂interfaces -> Auth interface classes
 ┃ ┃ ┃ ┣ 📂resolvers -> Auth GraphQL resolvers
 ┃ ┃ ┃ ┣ 📂services -> Auth services
 ┃ ┃ ┃ ┣ 📂strategies -> Auth strategies
 ┃ ┃ ┃ ┣ 📂types -> Auth GraphQL typeDefs
 ┃ ┃ ┃ ┗ 📜auth.module.ts
 ┃ ┣ 📜app.controller.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜app.resolver.ts
 ┃ ┣ 📜app.service.ts
 ┃ ┗ 📜main.ts
 ┣ 📂commands -> Command module
 ┃ ┗ 📜command.ts
 ┣ 📂configs -> Application's configs
 ┃ ┣ 📂auth
 ┃ ┣ 📂databases
 ┃ ┣ 📂graphql
 ┃ ┗ 📂queues
 ┣ 📂shared -> Shared components
 ┃ ┣ 📂constants
 ┃ ┣ 📂decorators
 ┃ ┣ 📂enums
 ┃ ┣ 📂errors
 ┃ ┣ 📂inputs
 ┃ ┣ 📂interceptors
 ┃ ┣ 📂interfaces
 ┃ ┣ 📂loggers
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂models
 ┃ ┣ 📂modules
 ┃ ┣ 📂pipes
 ┃ ┣ 📂types
 ┃ ┗ 📂utils
 ┗ 📂workers
 ┃ ┣ 📂modules -> Worker Modules
 ┃ ┃ ┣ 📂send-email -> SendEmail module, this is example of Worker Modules
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜send-email.worker.consumer.ts
 ┃ ┃ ┃ ┣ 📜send-email.worker.module.ts
 ┃ ┃ ┃ ┗ 📜send-email.worker.service.ts
 ┃ ┣ 📜worker.module.ts
 ┃ ┗ 📜worker.ts
</pre>