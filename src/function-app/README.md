# Meetup Portal function app

## Listener function

Listens for appropriate messages to appear in service bus. If something interesting appears in service bus it will grab it and decompose for set of internal tasks. Those tasks will be placed to internal storage queue and processed by renderer function.

Each internal task will have those fields:
- page to create/update (index, meetups-list, meetup-entity, etc.)
- additional arguments (meetup-id, partner-id, etc.)

Listener function should know the web site structure and know how each entity type and entity action will change the web site.

#### List of supported internal tasks
- { page: 'index' }
- { page: 'meetups-list', arguments: { year: &lt;int&gt; } }
- { page: 'meetup-entity', arguments: { meetup-id: &lt;uuid&gt; } }

## Renderer function

Listens for tasks for rendering html pages to appear in internal storage queue.