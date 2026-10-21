// Research-backed learning briefs. Scope, estimates, and client offers are our planning recommendations.
const GUIDE_SOURCES = {
 forms:['W3C: accessible forms','https://www.w3.org/WAI/tutorials/forms/','Use explicit labels, instructions, and understandable validation feedback.'],
 storage:['MDN: client-side storage','https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Client-side_storage','Browser storage is useful for prototypes; it is not shared storage across devices.'],
 notifications:['MDN: Notifications API','https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API','System notifications require permission and secure contexts in supporting browsers. In-app reminders are a simpler first step.'],
 seo:['Google: SEO Starter Guide','https://developers.google.com/search/docs/fundamentals/seo-starter-guide','Descriptive pages and useful original content support discovery; rankings are not guaranteed.'],
 local:['Google: Local Business structured data','https://developers.google.com/search/docs/appearance/structured-data/local-business','Business hours and appropriate business types can be described with structured data. Use accurate, visible information.'],
 print:['MDN: CSS printing','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing','Print-specific styles can hide controls and format documents for printing or browser PDF export.'],
 ranges:['PostgreSQL: range constraints','https://www.postgresql.org/docs/current/rangetypes.html','Range exclusion constraints can prevent overlapping reservations for the same resource.'],
 auth:['OWASP: authorization','https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html','Check permissions on each request; hiding controls in the interface is insufficient.'],
 uploads:['OWASP: file uploads','https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html','Restrict file types and sizes, rename stored files, and enforce access permissions.'],
 transactions:['SQLite: transactions','https://www.sqlite.org/lang_transaction.html','Transactions group related database changes; handle contention and failed commits.'],
 tenants:['OWASP: multi-tenant security','https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html','Keep each business’s records isolated, including queries, file access, and background jobs.'],
 billing:['Stripe: subscription webhooks','https://docs.stripe.com/billing/subscriptions/webhooks','Subscription changes arrive through events; application access must respond to payment and subscription status.'],
 crm:['HubSpot: CRM objects','https://developers.hubspot.com/blog/introducing-custom-objects-for-hubspot','Contacts, companies, and deals represent different records with relationships.']
};
const PROJECT_GUIDES = {
 '1': {
  level:'Beginner → intermediate',hours:'30–50 focused hours',audience:'You: a solo builder balancing work, personal commitments, and a portfolio.',
  ask:'Build a daily planner that makes the next useful action obvious and records real progress.',
  problem:'Tasks spread across notes make it hard to decide what to do today or remember what you achieved.',
  pages:['Today and overdue tasks','Project roadmap and milestone detail','Activity calendar and journal','Settings, backup, and pairing'],
  features:['Create, edit, complete, and reschedule work/personal tasks','High-priority focus list, due dates, and in-app reminders','Daily and selected-weekday recurrence with dated completion records','Weighted project milestones, active-day history, and weekly consistency','Local API synchronization, backup export, and import'],
  stack:'Keep HTML, CSS, and vanilla JavaScript. Use the existing Node.js local API. Learn DOM events, arrays, JSON, fetch, dates, and error handling before considering a framework.',
  data:['Task: id, title, category, priority, dueDate, repeatRule, projectId','Completion: taskId, occurrenceDate, completedAt','Project: id, title, weighted milestones','Session: date, minutes, reflection; workspace revision for conflicts'],
  rules:['One recurring occurrence must not complete another date','Progress comes from completed deliverables, not hours spent','Never overwrite another device’s newer data silently','In-app reminders only work while the app is open; mobile HTTP is not a system-push solution'],
  goals:['Complete a daily planning session without needing another notes app','Reload and reopen on a paired device without losing saved tasks','Explain the task creation and save code in your own words'],
  later:['Push notifications and HTTPS hosting','Account login and cloud sync','Calendar integrations and drag-and-drop scheduling'],
  plan:['Write five real daily-planning scenarios','Sketch Today and the mobile navigation','Build a task form with validation','Render tasks and implement completion','Implement editing and rescheduling','Model recurring occurrences and history','Connect storage and handle failed saves','Add milestone progress and activity dates','Test two devices and restore a backup','Document the app with a demo and lessons learned'],
  acceptance:['A repeating task can be completed today without completing tomorrow','A stale save produces a visible conflict instead of data loss','A backup restores tasks, projects, and journal entries','Keyboard users can open, complete, edit, and close a task form'],
  demo:'Show planning three tasks, completing one, checking the percentage, and reopening the workspace. Present it as your own learning project, not a client commission.',
  offer:'A personal productivity demo that demonstrates reliable application behavior. Use it as a technical case study rather than your first sales offer.',
  questions:['What counts as an active building day?','Should reminders appear inside the app or when it is closed?','Which information needs to sync across devices?'],sources:['storage','notifications','forms']
 },
 '2': {
  level:'Beginner',hours:'15–25 focused hours',audience:'A small-business owner deciding whether to hire you.',
  ask:'Build a portfolio that explains your service and proves you can deliver it.',problem:'A visitor needs to understand your offer, see relevant work, and know how to contact you.',
  pages:['Home with a clear service offer','Projects with two detailed case studies','About and working process','Contact and inquiry confirmation'],
  features:['Responsive navigation and one clear contact action','Project screenshots, live links, and honest demo labels','Case studies covering problem, scope, decisions, testing, and outcome','Accessible inquiry form or a clearly labeled email link','Unique page titles, descriptions, and compressed images'],
  stack:'HTML, CSS, and small JavaScript modules. Use static hosting for the portfolio; a real form needs a backend or a vetted form service. Do not add a database just for static case studies.',
  data:['Case study: title, target user, problem, screenshots, demo URL, lessons','Service: scope, deliverables, exclusions, process','Inquiry: name, email, project summary, submittedAt'],
  rules:['Never invent clients, testimonials, revenue, or conversion results','Only show work and imagery you have permission to publish','Form success must mean the message was actually accepted','Do not expose service credentials in browser JavaScript'],
  goals:['A reader can identify your service and contact method within the first screen','Two case studies have working demo links','A real test inquiry reaches its destination'],
  later:['Blog or CMS','Analytics after defining what to measure','More industries and service packages'],
  plan:['Choose one service and ideal client','Write the homepage offer and contact action','Outline two honest case studies','Sketch mobile and desktop layouts','Build navigation and homepage','Build reusable project cards','Write case study pages with screenshots','Implement and test contact delivery','Check accessibility, images, and metadata','Publish and record a 90-second portfolio walkthrough'],
  acceptance:['All project links work','Contact fields have labels and useful error messages','No horizontal overflow on a narrow phone','Images have appropriate alt text and dimensions'],
  demo:'Walk through one case study: what was needed, what you built, a difficult decision, and how you verified it.',offer:'Your sales home base. Link directly to the case study most relevant to a prospect rather than sending a generic list of skills.',
  questions:['Which service can I deliver confidently?','Which two demos prove that service?','What action should a visitor take next?'],sources:['seo','forms']
 },
 '3': {
  level:'Beginner',hours:'18–30 focused hours',audience:'A local cleaner, barber, photographer, or repair business.',ask:'Build a focused website that turns service questions into clear inquiries.',problem:'Customers cannot quickly find service coverage, prices, opening hours, or the next booking step.',
  pages:['Home','Services and service details','About and genuine proof of work','Contact / request a quote'],
  features:['Visible phone and inquiry actions','Service descriptions, coverage areas, and pricing guidance','Before/after gallery with permission','Opening hours, address or service area, and frequently asked questions','Quote form with service, area, and preferred date'],
  stack:'HTML, CSS, and JavaScript; static pages with a small server endpoint for inquiries. Add structured business metadata only after confirming the actual business details.',
  data:['Service: name, description, price basis, coverage','Business: verified name, phone, hours, service area','Inquiry: contact, service, location, preferred date, status'],
  rules:['A quote request is not a confirmed appointment','Do not claim a fixed price when the business needs to inspect the job','Use real reviews only with permission','Validate inquiries on the server and limit spam'],
  goals:['A customer can select a service and submit an inquiry on mobile','The owner receives enough information to respond','The owner can explain how contact details and services are maintained'],
  later:['Online scheduling','CMS editing','Payment collection'],
  plan:['Interview a business or write a labeled fictional brief','Collect services, hours, and approved photos','Map the inquiry journey','Build homepage and navigation','Build service detail sections','Add proof-of-work gallery and FAQs','Build the quote form and delivery endpoint','Add accurate metadata and contact links','Test inquiry delivery and mobile use','Prepare handover notes and a client demo'],
  acceptance:['Phone links open the dialer','Required form errors are readable','Failed submissions do not display success','Hours and service-area details match the approved brief'],
  demo:'Show how a customer finds a service and requests a quote in under a minute; demonstrate the received inquiry.',offer:'A tightly scoped service website with an inquiry workflow and handover guide. Agree the page count, content responsibilities, revisions, and maintenance before quoting.',questions:['Who receives inquiries?','What makes a lead qualified?','Who supplies images and confirms prices?'],sources:['local','forms','seo']
 },
 '4': {
  level:'Beginner',hours:'18–30 focused hours',audience:'An independent restaurant or café and its mobile visitors.',ask:'Build a fast mobile menu and a clear reservation inquiry flow.',problem:'Customers struggle with unreadable PDF menus, outdated hours, and unclear reservation arrangements.',
  pages:['Home with location and opening hours','Menu with categories','Reservation inquiry','Contact and directions'],
  features:['Readable menu text, prices, descriptions, and categories','Search or filter dishes without reloading','Availability labels for sold-out items','Reservation inquiry with party size, date, time, and contact','Owner-approved dietary information and directions link'],
  stack:'HTML, CSS, JavaScript, and a menu JSON file. Add an inquiry endpoint. Use a simple editor only after the owner identifies who updates the menu.',
  data:['Menu item: name, category, price, description, available, owner-supplied dietary labels','Opening hours: day, open, close, exceptions','Reservation inquiry: guests, requestedAt, contact, status'],
  rules:['Request submitted must not be presented as table confirmed','Do not guess allergy or dietary claims; the restaurant must approve them','Opening hours need holiday exceptions','Keep prices readable and show the currency'],
  goals:['Customers can browse the menu without pinching or downloading a PDF','The restaurant can verify a reservation request before confirming','A menu item can be updated without rebuilding the whole page'],
  later:['Confirmed table inventory and booking','Ordering and delivery','Payment integrations'],
  plan:['Collect an approved menu or create a fictional demo menu','Define reservation inquiry versus confirmation','Design mobile menu sections','Build homepage and hours','Render menu data','Add category filters and no-results feedback','Implement reservation fields and validation','Connect inquiry delivery','Test unavailable dishes and date errors','Publish a demo and write menu-update instructions'],
  acceptance:['Menu works without images loading','A past reservation date is rejected','Empty searches provide a reset action','The confirmation message clearly says the restaurant must confirm availability'],
  demo:'Use a phone to filter a menu, find a dish, and request a table. Show how the owner changes an item.',offer:'A mobile restaurant website with maintainable menu content; sell ordering only as a separately scoped later project.',questions:['How often does the menu change?','Who verifies dietary labels?','Who approves reservation requests?'],sources:['local','forms']
 },
 '5': {
  level:'Beginner → intermediate',hours:'25–45 focused hours',audience:'A small property agency publishing its own approved listings.',ask:'Build a searchable property catalogue that produces useful viewing inquiries.',problem:'Visitors need to narrow down properties and understand price, location, and availability before contacting an agent.',
  pages:['Listings and filters','Property detail and photo gallery','Viewing inquiry','Agency contact'],
  features:['Filter by area, type, price range, and bedrooms','Listing details with currency and rental period','Photo gallery, amenities, availability, and last-updated date','Viewing request tied to a specific property','Owner workflow to mark listings unavailable'],
  stack:'Start with HTML/CSS/JavaScript and 10 fictional listings in JSON. Add a Node API and database when building owner editing. A map is optional, not a prerequisite.',
  data:['Property: id, title, area, type, price, currency, pricePeriod, bedrooms, status, updatedAt','Photo: propertyId, approved URL, caption','Viewing inquiry: propertyId, contact, preferred time, status'],
  rules:['Use approved listing data; do not scrape and republish listings without permission','Display sold/unavailable states rather than silently accepting requests','Never imply ownership or availability has been verified unless it has','Collect only information needed to arrange a viewing'],
  goals:['Visitors can combine filters and reset them','Every inquiry identifies the property','Unpublished or unavailable properties have clear behavior'],
  later:['Map search','Saved searches and alerts','Agent accounts and bulk imports'],
  plan:['Write a small agency brief','Create 10 clearly fictional listing records','Design cards and detail pages','Render the catalogue','Implement combined filters','Implement sort and no-results states','Build a gallery and details view','Add property-specific inquiries','Test prices, empty fields, and unavailable listings','Publish and explain the data model in a case study'],
  acceptance:['Filters combine correctly rather than replacing each other','Min price greater than max price is handled','Missing photos have a useful fallback','Refresh or direct links still open the correct property'],
  demo:'Search for a specific budget and area, open a property, and submit a viewing inquiry.',offer:'An agency-owned catalogue and lead form. Avoid presenting it as a full property marketplace in the first proposal.',questions:['Who approves listings and photos?','How are price changes and unavailable properties reported?','Is the price monthly, yearly, or a sale amount?'],sources:['forms','seo','auth']
 },
 '6': {
  level:'Intermediate',hours:'45–75 focused hours',audience:'A single practitioner or one-location salon with defined services.',ask:'Build a booking flow that reserves an available service slot reliably.',problem:'Manual scheduling causes repeated messages and possible double bookings.',
  pages:['Service selection','Date and available slots','Customer details and confirmation','Owner calendar and cancellation management'],
  features:['Service durations and opening hours','Availability derived from existing bookings and closures','Server-confirmed bookings and reference numbers','Cancellation and owner-defined rescheduling','Clear timezone display and booking status'],
  stack:'JavaScript frontend with a Node API and PostgreSQL for booking constraints. Learn relational data and transactions before adding reminders or multiple staff calendars.',
  data:['Service: durationMinutes, price','Resource: staff or room id, timezone','Availability: working hours, breaks, blocked periods','Booking: resourceId, serviceId, startAt, endAt, customer, status'],
  rules:['The server must check and reserve availability in one safe operation','Store timestamps consistently and display the business timezone','Canceled slots may reopen; past slots cannot be booked','Do not assume a disabled slot button prevents two concurrent bookings'],
  goals:['Two simultaneous requests cannot reserve the same resource interval','The owner can block a day and cancel a booking','Customers see an explicit confirmed or rejected result'],
  later:['Deposits and refunds','Email/SMS reminders','Multiple locations and calendar synchronization'],
  plan:['Define service lengths and booking rules','Sketch the four-step customer flow','Model services, resources, and bookings','Build service selection','Generate slots with closures and breaks','Implement server-side reservation constraints','Add confirmation and reference lookup','Add cancellation and owner controls','Test simultaneous requests and timezone boundaries','Write a setup guide and demonstrate an actual collision test'],
  acceptance:['Overlapping bookings for the same resource are rejected','Different resources can use the same time','A cancellation follows the configured cutoff','A failed request never creates a misleading confirmation'],
  demo:'Book a slot from one browser, attempt the same slot from another, and demonstrate that the server rejects the conflict.',offer:'Single-business appointment scheduling with clear service and resource limits. Confirm reminder and payment requirements separately.',questions:['Can appointments overlap?','What are opening hours, buffers, and cancellation rules?','Which timezone and staff resources are involved?'],sources:['ranges','auth','forms']
 },
 '7': {
  level:'Intermediate',hours:'30–50 focused hours',audience:'A freelancer or small service business preparing quotes and invoices.',ask:'Build a quote and invoice tool with accurate totals and clean printable documents.',problem:'Copying spreadsheets and documents leads to inconsistent totals and difficult status tracking.',
  pages:['Document list and status filters','Quote/invoice editor','Print preview','Client records'],
  features:['Reusable clients and line items','Quantity, unit price, configurable discounts, and currency','Draft, sent, paid, and void states','Convert a quote into an invoice with a snapshot of its contents','Print styles and browser PDF export'],
  stack:'JavaScript calculations and HTML/CSS print layout first; add a Node API and SQLite for persistent records. Keep one currency per document and calculate money in integer minor units.',
  data:['Client: name, billing details','Document: number, type, currency, dates, status, client snapshot','Line item: description, quantity, unitAmount, discount','Payment record: amount, reference, date; no card details'],
  rules:['Issued documents should preserve the agreed details rather than changing when a client record changes','Use explicit rounding rules and test them','Marking paid is a recorded action, not proof of bank settlement','Tax and required invoice fields depend on the client’s jurisdiction; confirm them before commercial use'],
  goals:['Known example totals match manual calculations','A multi-page invoice prints without clipped totals','Quotes and invoices have distinct references and statuses'],
  later:['Payment provider links','Accounting export','Recurring invoicing and automated email'],
  plan:['Collect sample quote and invoice requirements','Define fields, statuses, and rounding rules','Model clients and document snapshots','Build line-item editing','Implement tested total calculations','Add quote-to-invoice conversion','Build print layout and page breaks','Store documents and search statuses','Test rounding and multi-page print examples','Create a demo with fictional business details'],
  acceptance:['Decimal and discount examples produce expected totals','Negative or invalid quantities are rejected','Print view hides editing buttons','Changing a client does not rewrite an issued invoice'],
  demo:'Create a quote, convert it, export a readable PDF, and record payment status using fictional data.',offer:'A document-preparation workflow. Do not promise tax compliance or payment verification without implementing and validating those requirements.',questions:['Which currencies and document fields are needed?','How are invoice numbers assigned?','Which accountant-approved calculation rules apply?'],sources:['print','transactions','forms']
 },
 '8': {
  level:'Intermediate',hours:'45–75 focused hours',audience:'A freelancer and a small number of clients reviewing deliverables.',ask:'Build a private portal where a client can see progress, review files, and leave feedback.',problem:'Project status and approvals are scattered across messages and file links.',
  pages:['Sign-in','Client project dashboard','Milestone and deliverable detail','Files and feedback','Freelancer management'],
  features:['Separate freelancer and client permissions','Project membership and milestone status','Private deliverable uploads or protected links','Threaded feedback tied to a deliverable','Explicit review and approval history'],
  stack:'Start with a mock UI using fictional data. Then use a Node API, relational database, established authentication library, and private file storage. Do not create your own password encryption scheme.',
  data:['User and project membership with role','Project and milestone','Deliverable: version, file reference, uploadedBy','Comment and approval: actor, versionId, timestamp'],
  rules:['Verify membership on every project, comment, and file request','A new deliverable version needs its own approval','Limit file sizes and types; do not serve arbitrary uploads as executable content','Client A must not access Client B’s data by guessing an ID'],
  goals:['A client can review only the projects they belong to','A freelancer can demonstrate an auditable approval','The project state remains understandable after revisions'],
  later:['Real-time chat','Invoices and payments','Electronic contracts'],
  plan:['Define freelancer and client permissions','Sketch project and deliverable views','Build the mock dashboard','Implement authentication and sessions','Implement project membership checks','Add milestone updates','Add protected file handling','Add comments and version-specific approvals','Test cross-client access with two accounts','Write onboarding and backup instructions'],
  acceptance:['Cross-client requests fail on the server','Unauthorized download URLs fail','Uploading a new version does not carry forward old approval','Failed uploads leave no falsely completed deliverable'],
  demo:'Use two fictional client accounts and show both the collaboration flow and denied access to another project.',offer:'A small private portal with a defined file limit and review process. Scope ongoing hosting and support explicitly.',questions:['Who can upload and approve?','Which file formats and sizes are needed?','How long should closed projects be retained?'],sources:['auth','uploads']
 },
 '9': {
  level:'Intermediate',hours:'40–65 focused hours',audience:'A small shop tracking a single location and simple product stock.',ask:'Build a stock and sales tracker that explains every inventory change.',problem:'Updating a stock number manually loses the history of sales, returns, and corrections.',
  pages:['Stock overview and low-stock list','Product detail and movement history','Record a sale','Returns and adjustments','Basic reports'],
  features:['Products with unique SKU and reorder level','Sales with line items','Stock receipts, returns, and adjustments with reasons','Low-stock indicators','Date-filtered sales and stock history'],
  stack:'JavaScript frontend, Node API, and SQLite transactions for a small local prototype. Learn SQL relationships and atomic writes before adding reporting charts.',
  data:['Product: SKU, name, price, reorderLevel','StockMovement: productId, quantityDelta, reason, reference, timestamp','Sale and SaleLine','Return: original sale line, quantity, reason'],
  rules:['Write a sale and its stock changes in one transaction','Define whether negative stock is allowed; default to rejecting it','Correct mistakes with reversing movements rather than deleting history','Prevent duplicate submissions from recording the same sale twice'],
  goals:['Stock equals the sum of recorded movements','A failed sale leaves both stock and sales records unchanged','The owner can trace a low-stock product to its recent movements'],
  later:['Barcode scanning','Multiple warehouses','Supplier purchasing and accounting integrations'],
  plan:['Define one-shop stock rules','Create 10 sample products','Model the movement ledger','Build product list and search','Implement stock receipts','Implement transactional sales','Implement returns and adjustments','Add low-stock and date filters','Test concurrent sales and duplicate submissions','Demonstrate reconciliation using sample records'],
  acceptance:['Selling more than available stock is rejected when negatives are disabled','A returned item restores the correct quantity once','A failed database write does not leave a partial sale','Duplicate SKUs are blocked'],
  demo:'Receive 10 items, sell 3, return 1, and show why the final stock is 8.',offer:'Single-location stock tracking with an agreed product count and data import scope. Do not describe it as a full accounting system.',questions:['Are fractional quantities needed?','How are returns handled?','Who may make stock adjustments?'],sources:['transactions','auth']
 },
 '10': {
  level:'Intermediate',hours:'30–50 focused hours',audience:'A solo freelancer managing a modest set of business opportunities.',ask:'Build a CRM that makes every prospect’s next follow-up clear.',problem:'Leads disappear in messages when contacts, opportunities, and next actions are not organized.',
  pages:['Pipeline overview','Contact and business details','Opportunity detail','Follow-up agenda'],
  features:['Contacts and businesses linked to opportunities','Stages from prospect through won/lost','Notes and dated activity timeline','Next follow-up date and overdue filter','Search, basic counts, and CSV export'],
  stack:'HTML/CSS/JavaScript or a framework only if already comfortable with it. Use Node and SQLite for shared records. Keep email sending manual in the first version.',
  data:['Contact: name, email, businessId','Business: name, website','Deal: contactId, service, stage, estimatedValue, nextActionDate','Activity: dealId, note, date, type'],
  rules:['Contacts and deals are different: one contact may have multiple opportunities','Do not equate pipeline value with earned revenue','Won and lost should preserve history','Keep exports safe for spreadsheets by neutralizing formula-like cells'],
  goals:['Every active opportunity has an owner-defined next action','Overdue follow-ups are easy to find','A contact’s history survives stage changes'],
  later:['Email synchronization','Automation sequences','Team assignments and forecasts'],
  plan:['Define your pipeline stages','Model contacts and opportunities','Build contact forms','Build a keyboard-friendly pipeline list','Add deal details and stage updates','Add notes and timeline','Implement follow-up agenda','Add search and safe export','Test duplicates and empty pipelines','Use fictional prospects in a sales-workflow demo'],
  acceptance:['Updating one deal does not change another deal for the same contact','Overdue follow-ups exclude closed deals','Filters have clear empty states','Exported text cannot execute as a spreadsheet formula'],
  demo:'Move a fictional lead from first contact to proposal, record a note, and schedule the next follow-up.',offer:'A lightweight relationship tracker tailored to one freelancer’s workflow; avoid competing with a full enterprise CRM in version one.',questions:['What are the exact stage definitions?','When is a deal considered won?','What information is needed before the next follow-up?'],sources:['crm','auth','forms']
 },
 '11': {
  level:'Advanced capstone',hours:'80–130 focused hours',audience:'A narrow service niche, such as small cleaning businesses.',ask:'Validate and build a reusable workspace for customers, quotes, jobs, and business accounts.',problem:'Small operators may duplicate customer and job information across calendars and messages; validate this with interviews before building.',
  pages:['Business onboarding','Customers','Quotes and jobs','Schedule','Team permissions','Account and billing status'],
  features:['One business workspace per account with protected membership','Customer records and a simple job lifecycle','Quotes that can become scheduled jobs','Owner and worker roles','Trial or manually granted pilot access before paid subscriptions'],
  stack:'Prototype the workflow with JavaScript, Node, and a relational database. Introduce businessId scoping and authorization from the start. Add a payment provider only after checking merchant eligibility, supported currencies, and current fees.',
  data:['Business, user, and membership role','Customer and address scoped to businessId','Quote, job, assignment, and status history','Subscription: provider reference, status, period; never card details'],
  rules:['Business identity comes from the authenticated session, not an untrusted request field','Enforce isolation in queries, exports, files, and background jobs','Payment events must be verified and processed idempotently','Interview real operators; do not interpret a polished demo as proof of demand'],
  goals:['Three operator interviews document existing workflow problems','One pilot completes a customer-to-job workflow','Two test businesses cannot read or modify each other’s records'],
  later:['Self-service subscriptions','Route planning','Advanced reporting and messaging integrations'],
  plan:['Interview three operators in one niche','Choose one recurring problem and define pilot scope','Prototype customer-to-job screens','Model business membership and tenant scoping','Implement customer records','Implement quotes and job scheduling','Add role-limited worker views','Run cross-business access tests','Run a pilot and record feedback','Only after validation, plan billing events and support procedures'],
  acceptance:['Business A cannot request Business B records using guessed IDs','A worker cannot perform owner-only actions','Retrying a job action does not duplicate it','Billing-stage tests cover duplicate events, payment failures, and cancellations'],
  demo:'Show the same workflow for two isolated fictional companies, then show pilot feedback separately from demo results.',offer:'First offer a limited pilot addressing one operator problem. Pricing and paid plans follow validation; no income or adoption guarantees.',questions:['What work is repeated every week?','Which existing tool would this replace?','Who pays and what measurable time or error reduction matters?'],sources:['tenants','billing','auth']
 },
 '12': {
  level:'Advanced capstone',hours:'75–120 focused hours',audience:'A small social-media agency and its clients reviewing content.',ask:'Build a content review workspace that makes the latest draft and approval state unambiguous.',problem:'Feedback scattered through chat creates uncertainty about which version was approved.',
  pages:['Workspace and client projects','Calendar and content list','Draft version detail','Comments and approvals','Membership and account settings'],
  features:['Content drafts with intended channel and planned date','Immutable version snapshots','Comments tied to a specific version','Reviewer permissions and changes-requested / approved states','Calendar view and approval audit trail'],
  stack:'JavaScript frontend, Node API, relational database, established authentication, and private media storage. Start with images and text; video uploads and social publishing add substantial complexity.',
  data:['Workspace and membership','Content item: clientProjectId, channel, plannedAt','Version: content snapshot, attachment references, author','Comment and approval: versionId, reviewer, decision, timestamp'],
  rules:['Editing approved content creates a new unapproved version','Clients see only their assigned projects','Only authorized reviewers can approve','A calendar date is a plan, not evidence that a social post was published'],
  goals:['A reviewer can identify and approve the exact version','An editor can trace requested changes to a draft','Two client accounts remain isolated'],
  later:['Automatic social publishing','Video transcoding and annotations','Subscriptions after pilot validation'],
  plan:['Interview an agency about its review process','Define roles and version states','Design calendar and draft views','Implement workspace membership','Implement draft creation','Implement immutable revisions','Add version-bound comments','Add approval rules and history','Test cross-client access and revised approvals','Run a pilot with fictional or permission-cleared content'],
  acceptance:['New versions do not inherit old approval','Unauthorized clients cannot download media','File type and size limits work','Dates display consistently in the agreed timezone'],
  demo:'Create a draft, request changes, upload a new version, and approve that version with an audit trail.',offer:'A client-approval pilot for one agency. Keep social publishing and high-volume media processing outside the initial contract.',questions:['Who gives final approval?','How many revision rounds are usual?','Which file formats and client-access rules are required?'],sources:['uploads','auth','tenants']
 }
};

function guideList(items){return `<ul>${items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;}
function guideDetails(title,body,open=false){return `<details class="guide-section" ${open?'open':''}><summary>${esc(title)}</summary><div>${body}</div></details>`;}
const baseProjectForm=projectForm;
projectForm=function(id){
 baseProjectForm(id);
 const g=PROJECT_GUIDES[id];if(!g)return;
 const dialog=document.querySelector('#dialog');dialog.classList.add('project-guide-dialog');
 const content=document.createElement('section');content.className='project-guide';
 content.innerHTML=`<div class="guide-intro"><span class="pill">${esc(g.level)}</span><p>${esc(g.audience)}</p><small>Researched 18 October 2026 · ${esc(g.hours)}. Planning estimate, not a deadline; allow extra time for learning and client revisions.</small></div>`+
 guideDetails('01 · Ask, details, rules & goals',`<h3>Your brief</h3><p>${esc(g.ask)}</p><h3>The problem</h3><p>${esc(g.problem)}</p><h3>Version-one features</h3>${guideList(g.features)}<h3>Rules</h3>${guideList(g.rules)}<h3>Success goals</h3>${guideList(g.goals)}`,true)+
 guideDetails('02 · Screens, tools & data',`<h3>Pages and screens</h3>${guideList(g.pages)}<h3>Suggested implementation</h3><p>${esc(g.stack)}</p><h3>Records to model</h3>${guideList(g.data)}<h3>Leave for a later version</h3>${guideList(g.later)}`)+
 guideDetails('03 · Your daily build checklist',`<p>Work in order. Each item is a work package; split it into 2–3-hour sessions when needed. Learning and debugging are part of the estimate.</p><ol>${g.plan.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><label>Schedule checklist starting<input type="date" id="guide-start" value="${today()}" required></label><p>Creates one task per calendar day for 10 days, including weekends. Reschedule larger items to fit your week. Existing checklist tasks are not duplicated.</p><button type="button" class="secondary" data-guide-tasks="${id}">Add 10 build tasks</button><p>These tasks track daily work. The five weighted milestones below remain manual: mark them only after reviewing the deliverables.</p>`)+
 guideDetails('04 · Tests & launch evidence',guideList(g.acceptance)+`<h3>For every project</h3>${guideList(['Test on your phone and desktop, with keyboard navigation and readable form errors','Test empty, loading, failure, and success states','Use fictional data for public demos and remove secrets before publication','Write setup, backup, and handover instructions; verify a fresh start'])}`)+
 guideDetails('05 · Portfolio & first-client preparation',`<h3>Demo to record</h3><p>${esc(g.demo)}</p><h3>Service offer</h3><p>${esc(g.offer)}</p><h3>Questions before quoting</h3>${guideList(g.questions)}<p>Capture the problem, screenshots, scope, implementation decisions, test evidence, and lessons learned. Do not invent business results. Agree deliverables, exclusions, revisions, and support in writing.</p>`)+
 guideDetails('06 · Vibe-coding prompts',`<p>Use these one at a time. Read and test each change before continuing.</p>${guideList([`Help me plan: ${g.ask} My current skills are HTML, CSS, and beginner JavaScript. Break the first feature into a 2–3-hour session.`,`Implement only the next checklist item using the suggested tools. Explain the files changed and the key JavaScript concepts. Preserve existing behavior.`,`Review this feature against these acceptance checks: ${g.acceptance.join('; ')}. Find actual failures and give reproduction steps.`,`Explain the data flow from a user action to storage and back to the screen. Ask me three questions to check my understanding.`])}`)+
 guideDetails('07 · Research sources',`<p>The sources support the technical guidance below. Feature scope, effort estimates, task order, and client offers are recommendations tailored to you, not claims of verified market demand.</p>${g.sources.map(key=>{const s=GUIDE_SOURCES[key];return `<article class="guide-source"><a href="${s[1]}" target="_blank" rel="noopener noreferrer">${esc(s[0])} ↗</a><p>${esc(s[2])}</p></article>`;}).join('')}`);
 document.querySelector('#form .track').insertAdjacentElement('afterend',content);
 content.querySelector('summary').focus({preventScroll:true});
 dialog.scrollTop=0;
};
document.querySelector('#dialog').addEventListener('close',()=>document.querySelector('#dialog').classList.remove('project-guide-dialog'));
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-guide-tasks]');if(!button)return;
 const id=button.dataset.guideTasks,g=PROJECT_GUIDES[id],start=document.querySelector('#guide-start').value;
 if(!start)return toast('Choose a start date.');
 let added=0;
 g.plan.forEach((title,i)=>{const guideKey=`guide-${id}-${i}`;if(state.tasks.some(t=>t.guideKey===guideKey))return;const d=new Date(start+'T12:00:00');d.setDate(d.getDate()+i);state.tasks.push({id:uid(),guideKey,title,category:'Work',priority:'Medium',date:dateKey(d),time:'',repeat:'none',days:[],project:id,notes:'From the researched project guide. Split this work package into smaller sessions if needed.',completed:[]});added++;});
 if(added){save();render();}toast(added?`${added} build tasks added. View Today or Upcoming.`:'This checklist is already in your tasks.');
});
