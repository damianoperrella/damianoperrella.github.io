/* ======================================================================
   PROJECTS — the one file you edit to add or change a project.
   The landing page cards and every project page read from this list.

   Each project:
     slug         the project's address: /project/?p=<slug>  (lowercase, hyphens)
     title        project name
     card         (optional) the image on the tarot card, e.g. "images/gone-with-the-cloud/card.jpg".
                  Crop it portrait (7:12). If left out, the cover is used.
     cover        the full-screen image at the top of the project page
                  (null = placeholder drawing). A landscape image suits it best.
     heroPosition (optional) which part of the cover stays in view when it is cropped
                  to the screen, as "x% y%", e.g. "50% 64%". Default "50% 50%".
     heroInk      (optional) "light" if the full-screen image is dark: the name, clock and
                  back link turn white while it is on screen
     subtitle     (optional) a line under the title
     year, location, type, category, studio, instructor(s), team, published, client, area, status, role, credits
                  any you leave out simply don't appear on the page
     descriptionTitle  (optional) a heading above the description
     description  a list of paragraphs
     content      what appears below, in order. Two kinds of item:

       an image:  { src: "images/project-one/01.jpg", caption: "South elevation",
                    w: 2000, h: 1333, size: "wide", align: "left" }
       a text:    { heading: "Optional heading", text: "A paragraph (or a list of paragraphs) set between the images.", size: "small", align: "right" }

       size   how wide the item is (default "wide")
                "full"   edge to edge, the whole width of the screen
                "wide"   the full width of the page margins
                "large"  two thirds
                "half"   half. Two halves in a row sit side by side
                "quarter" one quarter. Four in a row
                "small"  one third. A small and a large fit in one row
       align  "left" (default), "center" or "right": where it sits when it is
              narrower than the page
       w, h   the image's pixel size. They stop the page jumping while images load.
              (src: null = placeholder drawing)

   A project with no description and no content shows "Coming soon".
   The order of this list sets the Roman numeral on each card.
   ====================================================================== */

const PROJECTS = [
  {
    slug: "gone-with-the-cloud",
    title: "Gone with the Cloud",
    subtitle: "A Climate Institute for Governors Island Data Centre and Public Library",
    card: "images/gone-with-the-cloud/card.jpg",          // the pink model: the tarot card
    cover: "images/gone-with-the-cloud/site-plan.webp",   // the full-screen image at the top of the page
    heroPosition: "50% 45%",                              // which part of the full-screen image stays in view
    year: "2026",
    location: "Governors Island, New York City",
    type: "Academic project",
    studio: "Architecture Design and Construction Studio",
    instructors: "Klaus Hugo Steffan, Elisa Maruelli",
    team: "Damiano Perrella, Isabelle Pinault, Evgeniia Vlasova",
    descriptionTitle: "A Digital-Industrial Consciousness",
    description: [
      "In the bustling metropolis of New York City, it is easy to forget the anthropological effect of urbanism and contemporary life. A new trend has emerged where any piece of data can be preserved in the seemingly never-ending “cloud.” However, this invisible entity has a physical presence in the data center. This has created architecture for machines, going far beyond what has been imagined by radical architects. However, these buildings are not neutral spaces. When poorly designed, they continuously emit heat, take potable water from thirsty citizens, and draw endlessly on the electrical grid.",
      "In response to these issues, Gone with the Cloud is imagined as a tensile metal structure balanced on two massive steel piers that must reckon with its effect on the natural world. Located in one of the deepest sections of the Buttermilk Channel, it is threatened by sea level rise. The building is designed vertically with a data center below a library. Therefore, once the data habits across the world have sufficiently melted the icebergs, the data center will itself be “gone with the clouds.”"
    ],
    content: [
      {"src": "images/gone-with-the-cloud/cranes.jpg", "caption": "Industrial infrastructure adjacent to Governors Island including shipping cranes and warehouses", "w": 1600, "h": 1068, "size": "wide"},
      {"src": "images/gone-with-the-cloud/crane-diagram.webp", "caption": "Crane diagram", "w": 2400, "h": 1892, "size": "half"},
      {"src": "images/gone-with-the-cloud/program-axo.webp", "caption": "Spatial organization and formal logic", "w": 2400, "h": 1635, "size": "half"},
      {"heading": "A Precarious | Balanced | Tensile Structure", "text": "The building is constructed with a steel frame that is organized around the 2 piers. Each mass (the data center and the library) has a separate frame grid, which is supported by primary columns. These columns carry the load to the roof and are connected to steel cables and eventually to the massive central piers. The two piers carry the load to the sea floor, which is fortified with a concrete pad and piles that sit on New York’s bedrock.", "size": "small"},
      {"src": "images/gone-with-the-cloud/structure-axo.webp", "caption": "Structure", "w": 2600, "h": 1919, "size": "large"},
      {"src": "images/gone-with-the-cloud/model-1.jpg", "caption": "Model", "w": 1600, "h": 1063, "size": "half"},
      {"src": "images/gone-with-the-cloud/model-2.jpg", "caption": "Model, detail", "w": 2400, "h": 1596, "size": "half"},
      {"src": "images/gone-with-the-cloud/structural-axo.webp", "caption": "Structural Axonometric", "w": 2702, "h": 2461, "size": "large", "align": "center"},
      {"src": "images/gone-with-the-cloud/corner-detail.webp", "caption": "Corner Detail", "w": 2400, "h": 1710, "size": "large"},
      {"src": "images/gone-with-the-cloud/exploded-axo.webp", "caption": "Exploded Axonometric", "w": 2000, "h": 2738, "size": "small", "align": "right"},
      {"heading": "Circular Construction", "text": "The building is conceived as a circular structure which is built with recycled materials, can be completely remodelled and repurposed, and then eventually decommissioned. The steel is recycled from decommissioned shipping cranes, the insulation is made from recycled denim, and concrete rubble created from the demolition of buildings on the island will be used to support the 1 Billion Oyster Project. Eventually, the building can be remodeled for different uses. For example, when the data center inevitably becomes obsolete due to newer technology, the floors can be retrofitted. All the steel can be disconnected and recycled for new projects.", "size": "small"},
      {"src": "images/gone-with-the-cloud/circularity.webp", "caption": "Circularity diagram", "w": 2000, "h": 2335, "size": "large"},
      {"src": "images/gone-with-the-cloud/plan-l1-l3.webp", "caption": "Level 1 & 3, Data Center", "w": 1682, "h": 1564, "size": "half"},
      {"src": "images/gone-with-the-cloud/plan-l2.webp", "caption": "Level 2, Data Center", "w": 1676, "h": 1558, "size": "half"},
      {"src": "images/gone-with-the-cloud/plan-l4.webp", "caption": "Level 4, Library", "w": 1705, "h": 1558, "size": "half"},
      {"src": "images/gone-with-the-cloud/plan-l5.webp", "caption": "Level 5, Library", "w": 1706, "h": 1559, "size": "half"},
      {"src": "images/gone-with-the-cloud/sections.webp", "caption": "Sections, 1:200", "w": 3400, "h": 2089, "size": "wide"},
      {"src": "images/gone-with-the-cloud/details.webp", "caption": "Details, 1:20", "w": 3400, "h": 2778, "size": "wide"},
      {"src": "images/gone-with-the-cloud/perspective.webp", "caption": "Perspective", "w": 2400, "h": 3395, "size": "large", "align": "center"},
      {"src": "images/gone-with-the-cloud/interior-1.webp", "caption": "Interior perspective", "w": 2481, "h": 3023, "size": "half"},
      {"src": "images/gone-with-the-cloud/interior-2.webp", "caption": "Interior perspective", "w": 2000, "h": 2829, "size": "half"}
    ]
  },
  {
    slug: "saltscapes",
    title: "Saltscapes",
    subtitle: "A Proposal to Remediate the Great Lakes Region and Prevent Salinification",
    card: "images/saltscapes/card.jpg",
    cover: "images/saltscapes/topo-map.webp",
    heroPosition: "50% 70%",
    heroInk: "light",                                      // the header turns white over this dark image
    year: "2022",
    location: "Port Hope, Ontario",
    type: "Academic thesis",
    studio: "Options Studio",
    instructor: "Lisa Moffit",
    published: ["Architecture’s Model Environments, Lisa Moffit; London, England", "Building 22, no. 21, Carleton University; Ottawa, Canada"],
    descriptionTitle: "A Cause for Concern",
    description: [
      "Despite the ubiquity of de-icing infrastructure in contemporary cities across Canada, the insatiable need to spread road salt is fundamentally shifting the ecological composition of Lake Ontario. This project seeks to identify critical locations where road salt and the water systems of the Great Lakes interact, thereby critiquing the liberal use of rock salt. Through experimentation with salt in water and on ice, the effects of high salinity levels in bodies of water is revealed."
    ],
    content: [
      {"src": "images/saltscapes/boring-strength.jpg", "caption": "An investigation into the boring strength of salt water through a fresh water ice topography", "w": 1963, "h": 3465, "size": "half"},
      {"text": ["“Normally in spring and summer, when you have a temperature change, the lakes flip. The flipping is incredibly important because it takes the nutrients which have collected from dead and decaying things on the bottom and gives them to the things on top. Then, the top water is oxygenated a lot better so the oxygen moved to the bottom waters. When the salt comes into the lake, it’s denser. If that water sitting at the bottom is heavy, it’s going to be very hard to flip that lake and with that, you don’t get nutrients to the surface and you don’t get oxygen to the bottom. The entire ecosystem of the lake is severely damaged when you have that happen.”", "— Donna Kashian, Assoc. Professor of Biological Sciences, Wayne State University, Visiting Scientist at NOAA"], "size": "half"},
      {"heading": "Preliminary Experimentation", "text": "A mold was created with the intention of forming a topography to explore different land formations and facilitate research in different topographical scenarios in which the salt water could explore. As the salt water permeates the ice through these different conditions, the movement and settling of particulates through ground was also considered.", "size": "small"},
      {"src": "images/saltscapes/topography-3d.webp", "caption": "Topography, exploded axonometric", "w": 1445, "h": 3304, "size": "small"},
      {"src": "images/saltscapes/results.webp", "caption": "Topography results", "w": 2017, "h": 3065, "size": "small"},
      {"src": "images/saltscapes/mold.webp", "caption": "Topography mold", "w": 1517, "h": 1125, "size": "large", "align": "center"},
      {"src": "images/saltscapes/test-1.jpg", "caption": "Salt water boring through ice, test 1", "w": 1527, "h": 570, "size": "wide"},
      {"src": "images/saltscapes/test-2.jpg", "caption": "Salt water boring through ice, test 2", "w": 2293, "h": 570, "size": "wide"},
      {"src": "images/saltscapes/test-3.jpg", "caption": "Salt water boring through ice, test 3", "w": 2085, "h": 570, "size": "wide"},
      {"src": "images/saltscapes/growing-1.jpg", "caption": "Salt in water", "w": 1947, "h": 1039, "size": "half"},
      {"src": "images/saltscapes/growing-2.jpg", "caption": "Stirring", "w": 1947, "h": 1039, "size": "half"},
      {"src": "images/saltscapes/growing-3.jpg", "caption": "Salt on ice", "w": 1947, "h": 1039, "size": "large"},
      {"src": "images/saltscapes/salt-crystals.jpg", "caption": "Salt crystals", "w": 2000, "h": 2700, "size": "small"},
      {"heading": "Proposal", "text": ["Industrialization and modernization have led to an obsession with the motorized vehicle which, in turn, has proliferated the excessive use of road salt in cold climates. The liberal application of road salt on highways, roads, and sidewalks is a process that systematically yet imperceptibly contaminates the landscapes and waterways of Canada. The negative impacts of this loose-handed standard of infrastructure maintenance extend as far as the Great Lakes. After years of salt overuse, Lake Ontario has increased in salinity and has impeded the lake flipping effect which the aquasystem relies upon for oxygen and nutrients. Salt also has beneficial properties including its capacity to sequester industrial nuclear waste. In Port Hope, the home of the Cameco uranium refinery and the largest nuclear remediation project in Canada, salt can be used to highlight this radioactive contamination.", "The proposal, Saltscape, is designed as a salt cycle. Following the annual thaw that Canadian roads face every spring, thousands of tons of salt are washed directly into Port Hope’s ravines, down the Ganaraska River, and into Lake Ontario. The proposal diverts this highly saline water from the ravines through the storm water management system, eventually outletting it into the harbour, where it is collected and dried in magnificent salt ponds.", "A pier runs the length of the project terminating in Lake Ontario. The pier incorporates a “lake flipping” mechanism that visibly churns the water and regenerates its local nutrient content. The pier leads visitors and Port Hope residents into a salinified landscape that turns a liability into an asset."], "size": "small"},
      {"src": "images/saltscapes/render-silos.jpg", "caption": "Salt silos", "w": 2250, "h": 1266, "size": "large"},
      {"src": "images/saltscapes/render-ponds.jpg", "caption": "Salt ponds", "w": 2250, "h": 1499, "size": "half"},
      {"src": "images/saltscapes/render-bridge.jpg", "caption": "Pier", "w": 2250, "h": 1499, "size": "half"}
    ]
  },
  {
    slug: "cross-border-chronotopia",
    title: "Cross-Border Chronotopia",
    subtitle: "Rethinking Everyday Urban Ecosystems in Nicosia, Cyprus",
    card: "images/cross-border-chronotopia/card.jpg",
    cover: "images/cross-border-chronotopia/perspective-south.webp",
    heroPosition: "50% 55%",
    year: "2026",
    location: "Nicosia, Cyprus",
    type: "Academic project",
    studio: "Urban Design Studio",
    instructor: "Alice Buoli",
    descriptionTitle: "Introduction",
    description: [
      "The project is situated in the city of Nicosia, the divided capital of the island of Cyprus. The historic centre of the city has been physically partitioned since 1963, following the first ethnic clashes between Greek Cypriots and Turkish Cypriots. The division led to a further decline in urban life and building stock, exacerbated by the Turkish invasion of 1974. The Buffer Zone – currently inaccessible and managed by the United Nations – creates peripheral conditions in the heart of the historical centre, acting as a harsh divide and an undeclared European border."
    ],
    content: [
      {"src": "images/cross-border-chronotopia/manifesto.jpg", "caption": "Chronotopic urban planning in the shadow of military spolia around the UN Buffer Zone", "w": 2400, "h": 2244, "size": "large", "align": "center"},
      {"src": "images/cross-border-chronotopia/cyprus-map.webp", "caption": "Heritage and Geopolitical Military Territorial Map of Cyprus", "w": 2758, "h": 1866, "size": "wide"},
      {"src": "images/cross-border-chronotopia/immigration.webp", "caption": "Migration to and from Cyprus", "w": 2000, "h": 1375, "size": "large", "align": "center"},
      {"src": "images/cross-border-chronotopia/strategy-map.webp", "caption": "Nicosia Urban Redevelopment Plan", "w": 2879, "h": 3208, "size": "large", "align": "center"},
      {"heading": "Co-Production Hub", "text": "Softening the border by amplifying a collaborative approach where service providers and users work together as equals to design, create, and deliver services or products, shifting from passive consumption to active participation.", "size": "quarter"},
      {"heading": "Socio-Cultural Space", "text": "Creating a dynamic and intangible environment where social interactions, shared values, cultural norms, and physical places merge. Implementing temporary, participatory, and flexible interventions to bridge the city’s deep socio-political divide and revitalize underused areas. Key strategies include using pop-up structures, and community events to transform underused sites into a shared co-living space.", "size": "quarter"},
      {"heading": "Requalified Urban Voids", "text": "Reclaim and requalify underused spaces through temporary, participatory interventions that transform contested edges and abandoned sites into shared spaces.", "size": "quarter"},
      {"heading": "Ecologically Enhanced Spaces", "text": "Transforming parking lots into green spaces by replacing asphalt with pocket parks and landscaping, significantly enhancing urban biodiversity and reducing heat.", "size": "quarter"},
      {"heading": "Pedieos River Linear Park", "text": "Transforming the Pedieos river bank into an urban oasis and green promenade for recreation and active mobility, connecting several municipalities along the banks of the river, with ongoing initiatives to further extend and enhance the path.", "size": "quarter"},
      {"heading": "Bike Sharing Hub", "text": "Integrating a more efficient network of bike-sharing hubs in Nicosia to expand mobility choices and foster a more sustainable, human-centered transport system.", "size": "quarter"},
      {"heading": "Green Mobility Route", "text": "Generating a continuous, linear corridor of green space and infrastructure dedicated to active, sustainable transportation, such as cycling, walking, bus and car routes. Enhancing bus stop systems to improve passenger experience, accessibility, and safety through upgraded infrastructure like shelters, seating, and real-time information.", "size": "quarter"},
      {"heading": "Ecologically Enhanced Spaces", "text": "Creating connected, physically protected, and comfortable networks, shifting from painted lanes to segregated infrastructure. Key strategies include prioritizing cyclist safety at intersections, integrating with public transit, and providing secure, visible bike parking.", "size": "quarter"},
      {"heading": "Strategy", "text": "Acting pragmatically with a twin-city strategy, the interventions are mirrored across the North and South. If the border condition continues, each space can operate independently as a finalized and operational site. However, if the buffer-zone reopens, the two spaces can join together with an adaptable park that goes around the historic walls. Furthermore, the upper and lower streets will also link together.", "size": "small"},
      {"src": "images/cross-border-chronotopia/actors.webp", "caption": "Actors", "w": 1971, "h": 2055, "size": "small"},
      {"src": "images/cross-border-chronotopia/icons.webp", "caption": "Community building", "w": 1691, "h": 2219, "size": "small"},
      {"src": "images/cross-border-chronotopia/site-plan.webp", "caption": "Site plan", "w": 2542, "h": 3707, "size": "half"},
      {"text": ["In this specific context, five spaces are identified and integrated.", "1. The Upper City (South)", "2. The Lower City (South)", "3. The Upper City (North)", "4. The Lower City (North)", "5. The Scarp", "The interventions on each site include:", "1. Offices for social organizations", "2. Program spaces for workshops", "3. Mobility improvements to and from the site", "4. Restrooms and change-rooms", "5. Adaptable seating", "6. Cafe", "7. Lookout points"], "size": "half"},
      {"heading": "North Nicosia", "text": "The creation of space in the North focuses on openness along the ground floor to draw visitors towards the site. A key consideration was the importance of observation. Voids were not filled but reprogrammed to be used as spaces that facilitate observation and participation. A green mobility corridor, which provides protected bike lanes and pedestrian access, also increases safety around the site.", "size": "small"},
      {"src": "images/cross-border-chronotopia/north-phasing.webp", "caption": "North Nicosia, phasing", "w": 3089, "h": 1761, "size": "large"},
      {"src": "images/cross-border-chronotopia/axo-north.webp", "caption": "North Nicosia, aerial axonometric", "w": 3200, "h": 1327, "size": "wide"},
      {"heading": "South Nicosia", "text": "In the South, where core vehicle circulation conflicts with pedestrian access, protection of the site dictates the programmatic design. By either protecting the sidewalk with office or drawing visitors away from the street, there is a reduction of mingling between vehicles and pedestrians. The upper buildings also create open spaces that are celebrated and welcoming as an opportunity for observation or rest.", "size": "small"},
      {"src": "images/cross-border-chronotopia/south-phasing.webp", "caption": "South Nicosia, phasing", "w": 3200, "h": 1713, "size": "large"},
      {"src": "images/cross-border-chronotopia/axo-south.webp", "caption": "South Nicosia, aerial axonometric", "w": 3200, "h": 2066, "size": "wide"},
      {"src": "images/cross-border-chronotopia/perspective-north.webp", "caption": "North Nicosia, perspective", "w": 3200, "h": 2263, "size": "wide"},
      {"src": "images/cross-border-chronotopia/model-1.jpg", "caption": "Model", "w": 1600, "h": 1071, "size": "half"},
      {"src": "images/cross-border-chronotopia/model-2.jpg", "caption": "Model", "w": 1600, "h": 1200, "size": "half"}
    ]
  },
  {
    slug: "sackett-st-townhouse",
    title: "Sackett St. Townhouse",
    subtitle: "Adaptive Reuse of a Historic Brooklyn Brownstone",
    card: "images/sackett-st-townhouse/card.jpg",
    cover: "images/sackett-st-townhouse/dining.jpg",
    heroPosition: "50% 55%",
    heroInk: "light",
    year: "2023",
    location: "Brooklyn, NY",
    type: "Professional project",
    category: "Architecture | Residential",
    credits: "Photography: George Del Barrio",
    content: [
      {"src": "images/sackett-st-townhouse/parti.webp", "caption": "Parti", "w": 1210, "h": 2882, "size": "small"},
      {"src": "images/sackett-st-townhouse/stair.jpg", "caption": "Stair and dining", "w": 1311, "h": 1966, "size": "large"},
      {"text": "The clients envisioned an open-plan setting that retained distinctions between spaces. As a result, the design strategy involved configuring specific areas as semi-enclosed volumes to establish boundaries and define edges through the thoughtful application of materials, lighting, and color. In the heart of the home, the kitchen is clad in European Oak with custom millwork. The cabinetry seamlessly blends into the European Oak flooring and beyond into the dining room and living room.", "size": "small"},
      {"src": "images/sackett-st-townhouse/kitchen.jpg", "caption": "Kitchen", "w": 1966, "h": 1311, "size": "large"},
      {"src": "images/sackett-st-townhouse/plans-1.webp", "caption": "Proposed plans: cellar, basement and first floor", "w": 3260, "h": 2340, "size": "wide"},
      {"src": "images/sackett-st-townhouse/plans-2.webp", "caption": "Proposed plans: second and third floor", "w": 2106, "h": 2309, "size": "wide"},
      {"heading": "Arriving Home", "text": "Using custom design integrated millwork, this 4-story townhouse in Carroll Gardens, Brooklyn highlights the client’s desires for a seamless look using natural materials. The palette, which focused on warm wood tones, clean simple textiles, and traditional tile, was employed with care to completely renovate this historic structure.", "size": "small"},
      {"src": "images/sackett-st-townhouse/renders.webp", "caption": "Entry, renderings", "w": 2293, "h": 2710, "size": "large"},
      {"src": "images/sackett-st-townhouse/corridor.jpg", "caption": "Corridor", "w": 1344, "h": 2016, "size": "half"},
      {"src": "images/sackett-st-townhouse/doorway.jpg", "caption": "Garden doorway", "w": 1311, "h": 1966, "size": "half"}
    ]
  },
  {
    slug: "photography",
    title: "Photography",
    card: "images/photography/card.jpg",
    cover: "images/photography/hero.jpg",
    heroPosition: "50% 50%",
    year: "2022–present",
    location: "New York, Montreal, Toronto, Milano, Rome, Marrakech, Niagara, Polignano a Mare",
    type: "Photography",
    content: [
      {"src": "images/photography/01.jpg", "caption": "", "w": 2000, "h": 1335, "size": "wide"},
      {"src": "images/photography/02.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/03.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/04.jpg", "caption": "", "w": 1335, "h": 2000, "size": "half"},
      {"src": "images/photography/05.jpg", "caption": "", "w": 1333, "h": 2000, "size": "half"},
      {"src": "images/photography/06.jpg", "caption": "", "w": 2000, "h": 1335, "size": "wide"},
      {"src": "images/photography/07.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/08.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/09.jpg", "caption": "", "w": 2000, "h": 1335, "size": "small"},
      {"src": "images/photography/10.jpg", "caption": "", "w": 2000, "h": 1335, "size": "small"},
      {"src": "images/photography/11.jpg", "caption": "", "w": 2000, "h": 1335, "size": "small"},
      {"src": "images/photography/12.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/13.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/14.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/15.jpg", "caption": "", "w": 2000, "h": 1335, "size": "half"},
      {"src": "images/photography/16.jpg", "caption": "", "w": 2000, "h": 1335, "size": "wide"},
      {"src": "images/photography/17.jpg", "caption": "", "w": 2000, "h": 1333, "size": "wide"}
    ]
  },
  {
    slug: "brooklyn-symphony-orchestra",
    title: "Brooklyn Symphony Orchestra",
    subtitle: "Brand identity",
    card: "images/brooklyn-symphony-orchestra/card.jpg",
    cover: "images/brooklyn-symphony-orchestra/hero.jpg",
    heroPosition: "50% 55%",
    year: "2023–present",
    type: "Branding",
    client: "Brooklyn Symphony Orchestra",
    role: "Graphic designer",
    content: [
      {"src": "images/brooklyn-symphony-orchestra/program-beethoven.jpg", "caption": "Concert program cover", "w": 1320, "h": 2040, "size": "half"},
      {"src": "images/brooklyn-symphony-orchestra/program-shostakovich.jpg", "caption": "Concert program cover", "w": 1320, "h": 2040, "size": "half"},
      {"src": "images/brooklyn-symphony-orchestra/posters.jpg", "caption": "Public posters", "w": 724, "h": 484, "size": "small"},
      {"src": "images/brooklyn-symphony-orchestra/tickets.jpg", "caption": "Concert ticket stubs", "w": 1109, "h": 741, "size": "half", "align": "right"},
      {"src": "images/brooklyn-symphony-orchestra/bookmarks-mockup.jpg", "caption": "Bookmarks", "w": 2500, "h": 1409, "size": "wide"},
      {"src": "images/brooklyn-symphony-orchestra/bookmarks-designs.jpg", "caption": "Bookmarks, 2026/27 season", "w": 3160, "h": 1800, "size": "wide"}
    ]
  },
  {
    slug: "madera",
    title: "MADERA",
    subtitle: "Brand identity and packaging",
    card: "images/madera/card.jpg",
    cover: "images/madera/hero.jpg",
    heroPosition: "50% 50%",
    year: "2022–2025",
    type: "Branding",
    client: "MADERA",
    role: "Designer",
    descriptionTitle: "Seamless Wood Design",
    description: [
      "MADERA is a design firm that uses wood as its medium for innovation and creative expression, offering custom flooring, integrated millwork and bespoke furniture.",
      "The identity draws on the material itself: a quiet, widely spaced wordmark, a teal accent set against kraft board and raw timber, and botanical prints of an oak leaf and a flowering branch. It runs through a wood care kit with its sustainable bottle packaging, a softcover book, a storage box, a tote bag, a t-shirt, a five-panel hat and a woodshop apron."
    ],
    content: [
      {"src": "images/madera/bottle.jpg", "caption": "", "w": 2400, "h": 1600, "size": "wide"},
      {"src": "images/madera/book.jpg", "caption": "", "w": 2400, "h": 1601, "size": "wide"},
      {"src": "images/madera/apparel.jpg", "caption": "", "w": 2400, "h": 1601, "size": "wide"}
    ]
  },
  {
    slug: "urban-patches",
    title: "Urban Pat(c)h(es)",
    subtitle: "A masterplan for activating land in post-colonial India",
    card: "images/urban-patches/card.jpg",
    cover: "images/urban-patches/axo.webp",
    heroPosition: "50% 45%",
    location: "Kozhikode, Kerala, India",
    type: "Academic project",
    studio: "Global Studio, Building the City",
    instructors: "Roger Connah, Jesse Rafiero",
    description: [
      "Storytelling is a collaborative process, one that requires a storyteller and an audience. Each party performs a specific duty to allow stories to be shared, the former reveals their personal and intimate identity while the latter receives, understands, and interprets. Despite the fundamental structure of storytelling, each individual process is a personal enterprise. Stories are a uniquely interpersonal product. In Kozhikode, many of these stories come from colonialism.",
      "Colonialism shaped this area of India. The Portuguese rule brought many new ideologies and forms. Notably, the brick was an imported idea. Colonizers tend to ignore cultural differences. This project aims to celebrate the heterogenous culture that was a result of this harsh maltreatment. Consequently, this area of India is rich in cultural and specific differences, bringing unique situations that arise from the convergence of these members.",
      "Urban Pat(c)h(es) replicates the enterprise of storytelling in its collaboration, cyclical progression, and personal humility. The structure is made of five brick vaults, three of which house a specific type of data to propagate stories, either light data, precipitation data, or wind data. The materials for the bricks are sourced on the site, the site of removal becoming a quarry and later the terminus of the progression through the site. The bricks are then fired in an onsite kiln which is housed in an inaugural vault on the site, which will bear the traces of tile firing. The vaults are organized around a central courtyard, which allows for an exchange of perspective, and on a constant gentle slope upward. The slope is built of stone which is also sourced in the quarry."
    ],
    content: [
      {"src": "images/urban-patches/frontispiece.webp", "caption": "Site sketch", "w": 1629, "h": 1803, "size": "half"},
      {"src": "images/urban-patches/site-map.webp", "caption": "Site map, Kozhikode", "w": 2400, "h": 2450, "size": "half"},
      {"src": "images/urban-patches/demographics.webp", "caption": "Kozhikode demographics: age, religion, language, industry", "w": 1450, "h": 1210, "size": "large", "align": "center"},
      {"src": "images/urban-patches/lunette-1.webp", "caption": "Lunette I", "w": 2600, "h": 1838, "size": "half"},
      {"src": "images/urban-patches/lunette-2.webp", "caption": "Lunette II", "w": 2600, "h": 1816, "size": "half"},
      {"src": "images/urban-patches/section.webp", "caption": "Long section", "w": 2800, "h": 1717, "size": "wide"},
      {"text": "A visitor approaches the site from the North and travels south until reaching the slope and first vault which is the tile kiln; the form here narrates the construction. Then, the visitor begins to climb up and around the courtyard, passing through vaults of varying sizes listening to and telling stories. As the visitor approaches the top, they will pass through the fifth and final vault and descend a curved ramp also built of locally quarried stone. They arrive in the central courtyard at the base of the ramp – and can explore the generously open space – before moving towards the north and down a tunnelled ramp allowing their journey to end, or giving them the option to begin the cycle again.", "size": "large", "align": "right"},
      {"src": "images/urban-patches/vaults.webp", "caption": "Vault typologies", "w": 1650, "h": 2333, "size": "half"},
      {"text": "Urban patches aim to repair and create harmony in populous areas. The beauty of the human condition becomes apparent when interacting with other humans. As one interacts with another, their imagination becomes real and is delivered to the recipient in various forms (sound, touch, etc.) Therefore, interaction and communication is the patch between the imaginary and the real. Telling stories bridges imaginations and creates harmony in a world of various minds.", "size": "half"},
      {"src": "images/urban-patches/axo.webp", "caption": "Hybrid axonometric", "w": 2681, "h": 1857, "size": "wide"},
      {"text": "Under the brick surface of each vault, an exchange of information occurs. Open spaces created by the funicular structures line a processional ramp which winds its way throughout the site. As one walks along this ramp, one is met with a series of follies and progression through the site yields an exchange of stories. Along the journey, one is met with the elements that construct the stories. Progression concludes on the plane of fundamentality.", "size": "large", "align": "right"}
    ]
  },
  {
    slug: "grand-st-townhouse",
    title: "Grand St. Townhouse",
    subtitle: "Using reclaimed, historic wood to renovate a historic townhouse",
    card: "images/grand-st-townhouse/card.jpg",
    cover: "images/grand-st-townhouse/beams.jpg",
    heroPosition: "50% 30%",
    year: "2023",
    location: "Brooklyn, NY",
    type: "Professional project",
    category: "Architecture | Residential",
    description: [
      "Using heart pine, reclaimed from dilapidated industrial buildings in the North-Eastern United States, this historic Brooklyn brownstone radiates warmth. In discussion with the clients, the unique character of this wood was used to finish almost every plane. The floor, cabinetry, ceiling, and non-functional wood joists are all clad in custom-sawn, engineered heart pine. The availability of this lumber, possessing ample character including nail holes, knots, and uneven edges, dictated many forms in order to achieve a clean finished surface. Natural light plays across the wooden surfaces to reflect the warm glow of the wood into the vast double-height spaces of the house."
    ],
    content: [
      {"src": "images/grand-st-townhouse/window.jpg", "caption": "Double-height living space", "w": 2000, "h": 2500, "size": "half"},
      {"src": "images/grand-st-townhouse/beams.jpg", "caption": "Heart pine ceiling joists", "w": 1900, "h": 2848, "size": "half"},
      {"src": "images/grand-st-townhouse/process.jpg", "caption": "Engineered heart pine, custom-sawn", "w": 1440, "h": 960, "size": "large", "align": "center"},
      {"src": "images/grand-st-townhouse/render.webp", "caption": "Kitchen and double-height space, render", "w": 1000, "h": 1144, "size": "half", "align": "center"},
      {"src": "images/grand-st-townhouse/plans-upper.webp", "caption": "Proposed third and first floor plans", "w": 2200, "h": 2198, "size": "half"},
      {"src": "images/grand-st-townhouse/plans-lower.webp", "caption": "Proposed second floor and cellar plans", "w": 2200, "h": 2198, "size": "half"},
      {"src": "images/grand-st-townhouse/millwork.webp", "caption": "Kitchen millwork elevations", "w": 2243, "h": 3443, "size": "large", "align": "center"}
    ]
  },
  {
    slug: "the-playground",
    title: "The Playground",
    subtitle: "Revitalizing underused suburban land into multi-unit, dynamic housing",
    card: "images/the-playground/parti.webp",
    cover: "images/the-playground/axo-section.webp",
    heroPosition: "50% 55%",
    year: "2021",
    location: "Orléans, Ontario",
    type: "Academic project",
    studio: "Housing Studio",
    instructors: "Honorata Pienkowska, Ben Gianni",
    description: [
      "Located in primarily suburban Orléans, the development consists of nine residential buildings. This includes an eleven-storey single loaded corridor building composed of flats and stacked maisonettes, and a twenty-storey point access tower with a rooftop terrace. The buildings are connected by several raised pathways which increase pedestrian circulation throughout the development. Scattered across the site are floating rectangular structures which house various amenities. The site is divided by a North–South access, Ave de Lamarche, the main corridor for parking and vehicular circulation."
    ],
    content: [
      {"src": "images/the-playground/axo-section.webp", "caption": "Section axonometric", "w": 2000, "h": 2813, "size": "large", "align": "center"},
      {"src": "images/the-playground/parti.webp", "caption": "Parti: unit diagrams", "w": 1800, "h": 2438, "size": "half"},
      {"src": "images/the-playground/form-development.webp", "caption": "Form development: division of units, circulation of courtyards, push and pull dance", "w": 1398, "h": 2547, "size": "half"},
      {"src": "images/the-playground/site-plan.webp", "caption": "Site plan", "w": 2000, "h": 2837, "size": "half"},
      {"src": "images/the-playground/floor-plans.webp", "caption": "Unit floor plans", "w": 1921, "h": 2543, "size": "half"},
      {"src": "images/the-playground/building-axo.webp", "caption": "Building axonometric and wall details", "w": 1697, "h": 2418, "size": "large", "align": "center"},
      {"text": "The units within the residential modules are pushed and pulled – back and forth, towards and apart – at various points in dance with one another. The horizontal single-loaded corridor building, despite its length, and central point tower, despite its height, have been broken and shifted creating a more musical and playful environment. The horizontal building acts as a shield for the site and protects the shared courtyard from the busy main road, Innes Rd. However, ample opportunity is provided for automobile circulation to enter and navigate the site. The parking level beneath the two structures, provides enough parking space for the residences of both buildings.", "size": "large", "align": "right"},
      {"src": "images/the-playground/exploded-axo.webp", "caption": "Exploded axonometric", "w": 1521, "h": 2548, "size": "large", "align": "center"},
      {"src": "images/the-playground/elevation-render.webp", "caption": "Elevation", "w": 2600, "h": 1444, "size": "wide"},
      {"src": "images/the-playground/vignette-1.webp", "caption": "Vignette", "w": 1183, "h": 1198, "size": "half"},
      {"src": "images/the-playground/vignette-2.webp", "caption": "Vignette", "w": 1191, "h": 1155, "size": "half"},
      {"src": "images/the-playground/elevations-low.webp", "caption": "South and east elevations", "w": 2600, "h": 692, "size": "wide"},
      {"src": "images/the-playground/elevations.webp", "caption": "West, north, east and south elevations of the tower", "w": 1904, "h": 890, "size": "wide"},
      {"text": "The shared courtyards between the two buildings, as well as the space below the buildings, provide environments to be used by the community for various functions throughout the year. The central courtyard is surrounded on five sides by residential activity – North, South, East, West and above – by residential units, and below by parking.", "size": "large", "align": "right"},
      {"src": "images/the-playground/section.webp", "caption": "North–south section", "w": 1909, "h": 1179, "size": "wide"}
    ]
  }
];

/* ----------------------------------------------------------------------
   Helpers shared by the pages. You shouldn't need to touch anything below.
   ---------------------------------------------------------------------- */

function toRoman(n) {
  const map = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

/* placeholder cover: a simple architectural line drawing */
function placeholderCover(i) {
  const h = [38, 200, 350, 150, 270, 20, 90][i % 7];
  const apex = 70 + (i * 17) % 50;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${h} 30% 30%)"/>
      <stop offset="1" stop-color="hsl(${h} 25% 7%)"/></linearGradient></defs>
    <rect width="300" height="400" fill="url(#g)"/>
    <g fill="none" stroke="hsl(${h} 45% 72%)" stroke-opacity=".65" stroke-width="1.4">
      <path d="M40 340V170L150 ${apex}L260 170V340Z"/>
      <path d="M40 170H260M150 ${apex}V340"/>
      <rect x="110" y="250" width="40" height="90"/>
      <rect x="175" y="200" width="50" height="50"/>
      <path d="M20 340H280"/>
    </g></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* placeholder gallery image of any size: an elevation, a section or a plan */
function placeholderPlate(i, w, h) {
  const hue = [38, 200, 350, 150, 270, 20, 90][i % 7];
  const line = `hsl(${hue} 45% 74%)`;
  const X = f => (f * w).toFixed(1), Y = f => (f * h).toFixed(1);
  let g = "";
  if (i % 3 === 0) {                                   // elevation
    g = `<path d="M${X(.12)} ${Y(.8)}H${X(.88)}"/>
         <path d="M${X(.22)} ${Y(.8)}V${Y(.42)}L${X(.5)} ${Y(.24)}L${X(.78)} ${Y(.42)}V${Y(.8)}"/>
         <path d="M${X(.22)} ${Y(.42)}H${X(.78)}M${X(.5)} ${Y(.24)}V${Y(.8)}"/>
         <rect x="${X(.28)}" y="${Y(.52)}" width="${X(.1)}" height="${Y(.28)}"/>
         <rect x="${X(.58)}" y="${Y(.5)}" width="${X(.14)}" height="${Y(.14)}"/>`;
  } else if (i % 3 === 1) {                            // section with a stair
    let d = `M${X(.15)} ${Y(.8)}`;
    for (let k = 0; k < 8; k++) d += `H${X(.15 + (k + 1) * .045)}V${Y(.8 - (k + 1) * .055)}`;
    g = `<path d="${d}"/>
         <path d="M${X(.12)} ${Y(.8)}H${X(.88)}"/>
         <path d="M${X(.15)} ${Y(.8)}V${Y(.25)}H${X(.85)}V${Y(.8)}"/>
         <path d="M${X(.6)} ${Y(.25)}V${Y(.8)}M${X(.15)} ${Y(.5)}H${X(.45)}"/>`;
  } else {                                             // plan
    g = `<rect x="${X(.15)}" y="${Y(.2)}" width="${X(.7)}" height="${Y(.6)}"/>
         <path d="M${X(.5)} ${Y(.2)}V${Y(.8)}M${X(.15)} ${Y(.55)}H${X(.5)}M${X(.5)} ${Y(.4)}H${X(.85)}"/>
         <rect x="${X(.15)}" y="${Y(.2)}" width="${X(.7)}" height="${Y(.6)}" transform="translate(${X(.03)} ${Y(.03)})" opacity=".35"/>`;
  }
  const n = String(i + 1).padStart(2, "0");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 30% 30%)"/>
      <stop offset="1" stop-color="hsl(${hue} 25% 8%)"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <g fill="none" stroke="${line}" stroke-opacity=".7" stroke-width="${(w * .0022).toFixed(1)}">${g}</g>
    <text x="${X(.05)}" y="${Y(.94)}" fill="${line}" fill-opacity=".7" font-family="Helvetica, Arial, sans-serif"
          font-size="${(w * .022).toFixed(0)}" letter-spacing="${(w * .004).toFixed(1)}">PLACEHOLDER ${n}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
