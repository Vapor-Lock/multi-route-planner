Built on: https://eve-oj.com/

Give it a starting system and a comma separated list of systems you may want to visit. We'll tell you the jumps to each

`/api/v1/route?start=Jita&end=Amarr,Dodixie,Friggi`:

```
[
  "Jita to Amarr route length: 11",
  "Jita to Dodixie route length: 12",
  "Jita to Friggi route length: 8"
]
```

`/api/v1/route?start=Jita&end=Amarr,Dodixie,Friggi&preferHighSec=true`:

```
[
  "Jita to Amarr route length: 45",
  "Jita to Dodixie route length: 15",
  "Jita to Friggi route length: 8"
]
```
