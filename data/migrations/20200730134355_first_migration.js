
exports.up = function(knex) {
  return (
      knex.schema
      .createTable(
        'users', (tbl)=>{
            tbl.increments();
            tbl.string('email', 255) //users email
            .notNullable()
            .unique();
            tbl.string('display_name', 255) //unique display name
            .notNullable()
            .unique();
            tbl.string('first_name', 255);
            tbl.string('last_name', 255);
            tbl.string('password', 255)
            .notNullable();
        }
    )
    .createTable(
        'roles', (tbl)=>{
            tbl.increments();
            tbl.string('title', 255)
            .notNullable();
        }
    )
    .createTable(
        'organizations', (tbl)=>{
        tbl.increments();
        tbl.string('title', 255)
        .notNullable();
        tbl.string('description', 500);
        }
    )
    .createTable(
        'user_org_roles', (tbl)=>{
            tbl.increments();
            tbl.integer('user_key') //user that holds role at org
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
            tbl.integer('role_key') //role user has at org
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('roles')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
            tbl.integer('org_key') //org tied to this users role
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('organizations')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
            tbl.string('description', 500); //optional description of the users role at the org
        }
    )
    .createTable(
        'projects', (tbl)=>{
            tbl.increments();
            tbl.string('title', 255)
            .notNullable();
            tbl.string('description', 500)
            tbl.boolean('active') //toggle to filter out inactive projects
            .notNullable()
            .defaultTo(false)
            tbl.integer('org_key') //org that the project is tied to
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('organizations')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        }
    )
    .createTable(
        'issues', (tbl)=>{
            tbl.increments();
            tbl.string('title', 255) //because all things need titles
            .notNullable();
            tbl.string('content', 1000) //descriptor or issue, and how it can be reproduced
            .notNullable();
            tbl.boolean('open') //has the issue been resolved
            .notNullable()
            .defaultTo(false);
            tbl.integer('project_key') //project that issue is assigned to
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
            tbl.integer('created_by') //author of issue
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            tbl.timestamp('create_at') //when issue was created
            .notNullable()
            .defaultTo(knex.fn.now());
            tbl.timestamp('updated_at') //date last updated //may want to update this when a new comment rolls in
            .notNullable()
            .defaultTo(knex.fn.now());

        }
    )
    .createTable(
        'comments', (tbl)=>{
            tbl.increments();
            tbl.string('comment', 1000)
            .notNullable();
            tbl.integer('issue_key') //issue assigned to
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('issues')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
            tbl.timestamp('created_at') // to organize comments by time made
            .notNullable()
            .defaultTo(knex.fn.now())
            tbl.integer('created_by') //author
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        }
    )
  )
};

exports.down = function(knex) {
  return (
      knex.schema
      .dropTableIfExists('comments')
      .dropTableIfExists('issues')
      .dropTableIfExists('projects')
      .dropTableIfExists('user_org_roles')
      .dropTableIfExists('organizations')
      .dropTableIfExists('roles')
      .dropTableIfExists('users')
  )
};
