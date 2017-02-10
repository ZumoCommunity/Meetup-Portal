# Meetup Portal function app

#### Prerequisites (dev)
* Azure Storage Emulator https://azure.microsoft.com/en-us/downloads/
* Azure Functions CLI https://www.npmjs.com/package/azure-functions-cli

## Listener function

Listens for appropriate messages to appear in service bus. If something interesting appears in service bus it will grab it and decompose for set of internal tasks. Those tasks will be placed to internal storage queue and processed by renderer function.

Each internal task will have those fields:
- page to create/update (index, meetups-list, meetup-entity, etc.)
- additional arguments (meetup-id, partner-id, etc.)

Listener function should know the web site structure and know how each entity type and entity action will change the web site.

#### List of supported internal tasks
- { page: 'index' }
- { page: 'meetups-list', arguments: { year: &lt;int&gt; } }
- { page: 'meetup-entity', arguments: { meetupId: '&lt;uuid&gt;' } }

## Renderer function

Listens for tasks for rendering html pages to appear in internal storage queue.

How to run using func emulator:
```batch
func run renderer -c "{ page: 'index' }"
```
or
```batch
func run renderer -c "{ page: 'meetup-entity', arguments: { meetupId: '9673cf65-3bf0-4176-a98b-eec6764867ed' } }"
```

## Timer function