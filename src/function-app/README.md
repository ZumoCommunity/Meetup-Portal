# Meetup Portal function app

#### Prerequisites (dev)
* Azure Storage Emulator https://azure.microsoft.com/en-us/downloads/
* Azure Functions CLI https://www.npmjs.com/package/azure-functions-cli

#### Other recomended tools
* Azure Storage Explorer http://storageexplorer.com/
* Azure Service Bus Explorer https://github.com/paolosalvatori/ServiceBusExplorer/releases

## Listener function

Listens for appropriate messages to appear in service bus. If something interesting appears in service bus it will grab it and decompose for set of internal tasks. Those tasks will be placed to internal storage queue and processed by renderer function.

#### Event format
```json
{
    "action": "c" // c - created, u - updated, d - deleted
    "entity": "meetup",
    "entityId": "<uuid>"
}
```

#### Initialize meetup portal
```batch
func run listener -c "{ action: 'init' }"
```

#### Run listener for events

Each internal task will have those fields:
- page to create/update (index, meetups-list, meetup-entity, etc.)
- additional arguments (meetup-id, partner-id, etc.)

Listener function should know the web site structure and know how each entity type and entity action will change the web site.

#### List of supported internal tasks
- { page: 'index' }
- { page: 'meetups-list' }
- { page: 'meetup-entity', arguments: { meetupId: '&lt;uuid&gt;' } }

## Renderer function

Listens for tasks for rendering html pages to appear in internal storage queue.

#### Run renderer for pages without arguments
```batch
func run renderer -c "{ page: 'index' }"
func run renderer -c "{ page: 'partners' }"
func run renderer -c "{ page: 'speakers' }"
func run renderer -c "{ page: 'meetups-list' }"
```

#### Run renderer for pages with arguments
```batch
func run renderer -c "{ page: 'meetup-entity', arguments: { meetupId: '<uuid>' } }"
```


## Timer function