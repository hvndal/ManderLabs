// Legal / policy documents.
//
// Content only — presentation lives in app/legal/[doc]/page.js, which renders
// any document in this shape. Adding a policy is adding an object here.
//
// Section shape: { h, p?: string[], ul?: string[] } — a heading plus prose
// and/or a list. Nothing here is page-specific markup, so the design system
// stays the single source of visual truth.
//
// WRITTEN AGAINST WHAT THE SITE ACTUALLY DOES. The privacy policy in
// particular was derived from an audit of the codebase, not a template:
// three Web3Forms-backed forms, Vercel hosting, and no analytics, cookies,
// storage, tracking or on-site payments of any kind. Do not add claims here
// for services MANDER doesn't genuinely use — that's the one change that
// turns this file from a protection into a liability.

import { BRAND } from './content';

const EMAIL = BRAND.email;
const UPDATED = '9 August 2026';

// Governing law follows where the company originates — the founder works out
// of Langley, BC. Revisit with a lawyer if MANDER incorporates elsewhere.
const JURISDICTION = 'British Columbia, Canada';

const CONTACT_SECTION = {
  h: 'Contact',
  p: [
    `Questions about this policy, or any request relating to it, can be sent to ${EMAIL} and we will respond within a reasonable period.`,
    'MANDER is a remote studio serving clients across the United States and Canada. We do not operate a public office or walk-in premises, so email is the correct and fastest route for every enquiry, including legal and privacy requests.',
  ],
};

export const LEGAL_DOCS = [
  /* ------------------------------------------------------------- Privacy */
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    nav: 'Privacy',
    description:
      'How MANDER collects, uses and protects personal information submitted through this website. No analytics, no cookies, no tracking.',
    lede: 'This policy describes what happens to information you send us through this website. It reflects what the site actually does — not a generic template.',
    sections: [
      {
        h: 'Summary',
        p: [
          'This website does not use cookies, analytics, advertising pixels, session recording or any other tracking technology. We do not build profiles of visitors, and we do not sell or rent personal information to anyone, ever.',
          'The only personal information we receive is what you deliberately type into one of our forms or send us by email.',
        ],
      },
      {
        h: 'Information we collect',
        p: [
          'We collect information in three places, and only when you choose to submit it:',
        ],
        ul: [
          'Enquiry form — your name, email address, the plan you are interested in, and your message.',
          'Fit quiz — your name, email address, and the answers you selected during the quiz.',
          'Community Rate request — the category you select, your name, email address, and an optional note. No documentation upload exists anywhere in this flow, and we do not ask you to prove your circumstances by uploading personal records.',
        ],
      },
      {
        h: 'Information collected automatically',
        p: [
          'This site is hosted on Vercel. Like effectively all web hosting, Vercel processes standard technical request data — such as IP address, browser user-agent, requested URL and timestamp — for the purpose of serving the site, security and abuse prevention. We do not add any analytics layer on top of this and we do not use that data to identify or profile individual visitors.',
          'The web fonts used on this site are self-hosted and served from our own domain at build time, so loading a page does not send a request to a font provider. Images are served through our own image pipeline rather than by a third-party host.',
        ],
      },
      {
        h: 'Cookies and tracking',
        p: [
          'We do not set cookies. We do not use local storage or session storage. We do not run Google Analytics or any equivalent, and there are no advertising or social media tracking pixels on this site.',
          'Because of this, there is no cookie consent banner — there is nothing to consent to. If this ever changes, this policy will be updated before the change goes live.',
        ],
      },
      {
        h: 'How we use your information',
        p: ['We use the information you submit only to:'],
        ul: [
          'Respond to your enquiry and have a conversation about your project.',
          'Prepare a proposal, scope or quote you have asked for.',
          'Apply the Community Rate where you have requested it and appear eligible.',
          'Deliver and support work you have engaged us for.',
          'Meet legal, tax and accounting obligations.',
        ],
      },
      {
        h: 'How your information is shared',
        p: [
          'We do not sell, rent or trade personal information. We share it only with the service providers we genuinely rely on to operate:',
        ],
        ul: [
          'Web3Forms — processes our form submissions and relays them to our email inbox. Anything you type into a form on this site passes through this provider.',
          'Vercel — hosts the website and processes standard server request data as described above.',
          'Our email provider — receives and stores the message that results from your submission.',
        ],
        // Deliberately no payment processor named: none is integrated. See the
        // Terms for how payment actually works today.
      },
      {
        h: 'Payments',
        p: [
          'This website does not take payments. There is no checkout, no card form and no payment gateway embedded anywhere on this site. Project payments are invoiced separately once a scope is agreed.',
          'Where an invoice is settled through a third-party payment provider, your card or banking details are entered with that provider and handled under their terms and privacy policy. MANDER does not collect, see or store full card numbers.',
        ],
      },
      {
        h: 'Communications',
        p: [
          'We contact you in reply to what you sent us. We do not operate a marketing mailing list from this website, and submitting a form does not subscribe you to anything. If we ever introduce a newsletter it will be opt-in, and you will be able to unsubscribe from any message it sends.',
        ],
      },
      {
        h: 'Data security',
        p: [
          'The site is served over HTTPS, and we use reputable providers and sensible access controls on the inbox where enquiries land. We keep the number of places your data sits deliberately small, which is itself a meaningful security measure.',
          'No method of transmission or storage is completely secure, and we cannot and do not guarantee absolute security. Please do not send us passwords, financial account numbers, government identification numbers or other sensitive personal data through the forms on this site — none of our forms ask for any of it.',
        ],
      },
      {
        h: 'Retention',
        p: [
          'Enquiries are kept for as long as needed to deal with them and to maintain a normal business record of client and prospective-client correspondence, after which they are deleted. Where we have an ongoing or completed client relationship, project correspondence and records may be retained longer where required for tax, accounting or legal purposes.',
          'You can ask us to delete your enquiry at any time and we will do so unless we are required to keep it.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'Depending on where you live, you may have rights to access the personal information we hold about you, to have it corrected, to have it deleted, to object to or restrict how we use it, and to receive a copy of it. Residents of Canada, the United States (including under state privacy laws such as those in California) and the EEA/UK may have specific statutory rights of this kind.',
          `To exercise any of these, email ${EMAIL}. We will not charge you for a reasonable request and we will not treat you differently for making one. Because we hold very little data, most requests are straightforward for us to fulfil.`,
        ],
      },
      {
        h: "Children's privacy",
        p: [
          'This site is intended for businesses and is not directed at children. We do not knowingly collect personal information from children. If you believe a child has sent us personal information, contact us and we will delete it.',
        ],
      },
      {
        h: 'Third-party links',
        p: [
          'This site links to external sites, including our founder’s personal portfolio and clients’ own websites. Once you follow a link away from this site, this policy no longer applies and we are not responsible for the privacy practices or content of those sites.',
        ],
      },
      {
        h: 'International users',
        p: [
          'MANDER works across the United States and Canada, and our service providers may process and store data in either country or elsewhere. If you contact us from outside those countries, you understand that your information will be transferred to and handled in jurisdictions whose data protection laws may differ from your own.',
        ],
      },
      {
        h: 'Changes to this policy',
        p: [
          'We may update this policy as the site or the business changes. The revision date at the top of this page always reflects the current version, and material changes will be reflected here before they take effect.',
        ],
      },
      CONTACT_SECTION,
    ],
  },

  /* --------------------------------------------------------------- Terms */
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    nav: 'Terms',
    description:
      'The terms governing MANDER’s website design, development, branding and related digital services, including scope, payment, ownership and liability.',
    lede: 'These terms govern the use of this website and the digital services MANDER provides. Where we sign a separate written proposal or agreement with you, that document takes precedence over anything here that conflicts with it.',
    sections: [
      {
        h: 'Services',
        p: [
          'MANDER provides digital services: website design, website development, website redesign, brand identity, search engine optimisation, local search work, and ongoing maintenance under a care plan. All services are delivered remotely.',
          'Nothing on this website is an offer capable of acceptance. Prices shown are starting prices for the scope described, and a project becomes binding only when we have agreed a written scope and you have confirmed it.',
        ],
      },
      {
        h: 'Project scope',
        p: [
          'Each project is quoted against a written scope that sets out deliverables, page or screen counts, revision rounds and timeline. The price we agree is tied to that scope.',
          'Work requested outside the agreed scope is not included. Where you ask for something additional, we will tell you before starting it whether it changes the price or the timeline, and we will not proceed with chargeable extra work without your approval.',
        ],
      },
      {
        h: 'Your responsibilities',
        p: [
          'A project depends on both sides. You agree to provide timely feedback and approvals, a single point of contact empowered to make decisions, and the access we need to relevant accounts, domains and platforms.',
          'You are responsible for the accuracy of the business information you give us, including prices, claims, contact details, hours and service areas that we place on your site.',
        ],
      },
      {
        h: 'Content and assets you provide',
        p: [
          'Unless copywriting or asset creation is expressly in scope, you supply the text, images, logos, video and other material for the project.',
          'You confirm that you own or are properly licensed to use everything you send us, and that it does not infringe anyone’s rights or break any law. You agree to indemnify us against claims arising from material you supplied. We are not obliged to verify the ownership or legality of your material, and we may decline to publish anything we reasonably believe is unlawful or infringing.',
        ],
      },
      {
        h: 'Approvals and acceptance',
        p: [
          'We present work at agreed stages for your review. Where a deliverable is approved, or where you do not raise it within a reasonable period after we ask for sign-off, it is treated as accepted and the project proceeds on that basis.',
          'Approval is your confirmation that copy, imagery and functionality are correct. Changes to an approved deliverable later in the project may be treated as additional work.',
        ],
      },
      {
        h: 'Revisions',
        p: [
          'Each plan includes a stated number of revision rounds. A revision round is a consolidated set of feedback, not an open-ended series of individual requests.',
          'Revisions refine the agreed direction. A change of direction — a new brand, a different structure, or a substantially different concept after approval — is new work and is quoted separately.',
        ],
      },
      {
        h: 'Timelines and delays',
        p: [
          'Timelines we give are good-faith estimates based on the agreed scope and on receiving what we need from you when we need it. They are not guarantees of a fixed delivery date unless we have expressly agreed one in writing.',
          'Delays caused by late content, late feedback, late approvals, scope changes, or third parties will move the schedule. Where a project stalls on your side for an extended period, we may pause it and reschedule the remaining work around our other commitments, and we may re-quote if costs have materially changed.',
        ],
      },
      {
        h: 'Payment terms',
        p: [
          'Prices are quoted in USD unless otherwise agreed; Canadian clients can be invoiced in CAD on request. Prices exclude any taxes, duties or third-party fees, which are your responsibility unless we state otherwise in writing.',
          'Unless the written scope says otherwise, a deposit is payable before work begins and the balance is payable before launch or handover. Care plan fees are billed monthly in advance.',
          'Invoices are payable by the date stated. We may suspend work, withhold delivery or handover, or stop care plan services on overdue accounts, and we may charge reasonable costs of recovery to the maximum extent permitted by applicable law.',
        ],
      },
      {
        h: 'Deposits',
        p: [
          'The deposit reserves your place in our schedule and funds the initial strategy and design work. Once we have started work or committed resources against your project, the deposit is generally non-refundable. See the Refund & Cancellation Policy for the detail.',
        ],
      },
      {
        h: 'Cancellation',
        p: [
          'Either party may end a project in writing. Where you cancel, you remain liable for work completed and resources committed up to that point, and for any non-refundable third-party costs already incurred on your behalf.',
          'Where we cancel a project for reasons other than your breach, we will hand over the work completed to that point and refund amounts paid for work not performed. The Refund & Cancellation Policy governs.',
        ],
      },
      {
        h: 'Third-party services and platforms',
        p: [
          'Projects commonly rely on third parties — hosting, domain registrars, content platforms, form and email services, booking or CRM tools, payment providers, fonts and stock imagery.',
          'Those services are governed by their own terms and pricing, which can change. We are not responsible for a third party’s outage, price change, policy change, data loss or discontinuation, though we will help you respond to it. Third-party fees are yours unless expressly included in scope.',
        ],
      },
      {
        h: 'Domains and hosting',
        p: [
          'Wherever practical, domains and hosting are registered in your name and remain your property, and you are responsible for keeping them renewed and paid for.',
          'Where we manage hosting under a care plan, the underlying infrastructure is provided by third parties and is subject to their terms and their availability.',
        ],
      },
      {
        h: 'Maintenance and support',
        p: [
          'The care plan is optional and month-to-month. It covers hosting, security measures, backups and small content edits as described on the pricing page. It does not cover new pages, redesigns, new features or recovery from problems you or a third party caused, which are quoted separately.',
          'Without a care plan, the site is yours to maintain after handover and we have no ongoing obligation to monitor, update or support it.',
        ],
      },
      {
        h: 'Security',
        p: [
          'We build using current practice and take reasonable measures to protect the sites we deliver. We cannot guarantee that any website is immune to attack, vulnerability or unauthorised access — no one honestly can.',
          'Where a site is compromised, and where the cause is not our failure to perform the services we agreed, remediation is chargeable work. Software, plugins and platforms outside our control may develop vulnerabilities after launch; keeping them patched is part of the care plan, and is your responsibility if you do not hold one.',
        ],
      },
      {
        h: 'Backups',
        p: [
          'Care plan clients receive routine automated backups as described on the pricing page. We aim to keep these current and restorable, but we do not warrant that every backup will be complete or restorable in every circumstance, and we recommend you keep your own copy of critical content.',
          'Without a care plan, we do not retain backups of your site after handover.',
        ],
      },
      {
        h: 'Uptime and outages',
        p: [
          'We do not guarantee uninterrupted availability. Hosting infrastructure, domain services and networks occasionally fail, and maintenance sometimes requires brief downtime. We are not liable for losses arising from downtime, particularly where it originates with a third-party provider.',
        ],
      },
      {
        h: 'SEO and results',
        p: [
          'Search engines control their own ranking systems and change them without notice. We do not control Google, and no one can legitimately promise a position in its results.',
          'We therefore make no guarantee of any particular ranking, placement, indexation, traffic volume, enquiry volume, lead quality, conversion rate, sales or revenue. What we commit to is competent, current, guidelines-compliant work — technical foundations, structure, content and local search setup — not an outcome that depends on third parties, your market, your competitors and your own follow-up.',
          'We do not use manipulative or deceptive tactics that risk penalties. If you ask us to, we will decline.',
        ],
      },
      {
        h: 'Intellectual property and ownership',
        p: [
          'On full payment of all sums due, ownership of the final deliverables produced specifically for you — the site, its design, its custom code and the assets we created for the project — transfers to you.',
          'Until payment is made in full, we retain ownership of the work and you have no licence to use it in public.',
          'We retain ownership of our own pre-existing materials, tools, frameworks, internal libraries, techniques and know-how, including anything we developed before or independently of your project. Where these are embedded in your deliverables, you receive a perpetual, non-exclusive, worldwide licence to use them as part of those deliverables.',
          'Third-party components — fonts, stock imagery, plugins, platforms and open-source libraries — remain the property of their owners and are supplied to you under their own licences, which you must comply with.',
        ],
      },
      {
        h: 'Portfolio and case studies',
        p: [
          'Unless you tell us in writing that you would rather we did not, we may display the work we produced for you in our portfolio, case studies and marketing, including your name, logo, screenshots and a factual description of what we delivered.',
          'We will not publish confidential information, commercial figures you have not approved, or invented claims about results. You can ask us to remove your project from our public materials at any time.',
        ],
      },
      {
        h: 'Confidentiality',
        p: [
          'Each party agrees to keep the other’s confidential business information private, to use it only for the project, and not to disclose it without permission. This does not apply to information that is already public, that a party already lawfully held, or that must be disclosed by law.',
        ],
      },
      {
        h: 'Warranties and disclaimers',
        p: [
          'We warrant that we will perform our services with reasonable care and skill, in a professional manner, using appropriately experienced people.',
          'To the maximum extent permitted by applicable law, and except as expressly stated in these terms, our services and this website are provided "as is" and "as available", and we disclaim all other warranties, whether express, implied or statutory, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.',
          'Nothing in these terms excludes or limits any warranty, guarantee or right that cannot lawfully be excluded or limited, including under applicable consumer protection legislation.',
        ],
      },
      {
        h: 'Limitation of liability',
        p: [
          'To the maximum extent permitted by applicable law, neither party is liable to the other for indirect, incidental, special, consequential, exemplary or punitive damages, or for lost profits, lost revenue, lost business, lost goodwill or lost or corrupted data, however caused, even if advised such losses were possible.',
          'To the maximum extent permitted by applicable law, our total aggregate liability arising out of or relating to a project is limited to the total amount you actually paid us for that project in the twelve months preceding the event giving rise to the claim.',
          'Nothing in these terms limits liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence, or any other liability that cannot lawfully be limited. Some jurisdictions do not allow certain limitations, so parts of this section may not apply to you.',
        ],
      },
      {
        h: 'Indemnification',
        p: [
          'You agree to indemnify and hold MANDER harmless against claims, damages, losses and reasonable legal costs arising from material you supplied to us, from your use of the deliverables after handover, from your breach of these terms, and from your breach of any law or third-party right.',
        ],
      },
      {
        h: 'Force majeure',
        p: [
          'Neither party is liable for failure or delay in performing its obligations where caused by events beyond its reasonable control, including natural disasters, fire, flood, epidemic or pandemic, war, civil unrest, terrorism, strikes, government action, power or network failure, major internet or infrastructure outages, or the failure of a third-party provider. Affected obligations are suspended for the duration of the event.',
        ],
      },
      {
        h: 'Governing law',
        p: [
          `These terms are governed by the laws of ${JURISDICTION}, without regard to conflict of law principles, and the courts of that jurisdiction have non-exclusive jurisdiction over disputes.`,
          'If you are a consumer, this does not deprive you of the protection of mandatory provisions of the law of the country where you live.',
          'Before formal proceedings, both parties agree to attempt in good faith to resolve any dispute by direct discussion.',
        ],
      },
      {
        h: 'Severability and entire agreement',
        p: [
          'If any provision of these terms is found unenforceable, it will be limited or removed to the minimum extent necessary and the remaining provisions stay in full force.',
          'These terms, together with any written proposal, scope or agreement we sign with you, form the entire agreement between us on their subject matter and supersede earlier discussions. A failure to enforce a provision is not a waiver of it.',
        ],
      },
      {
        h: 'Changes to these terms',
        p: [
          'We may update these terms as our services change. The revision date at the top of this page reflects the current version. Changes are not retroactive: a project already underway continues under the terms in force when it was agreed, unless we both agree otherwise in writing.',
        ],
      },
      CONTACT_SECTION,
    ],
  },

  /* ------------------------------------------------- Refund/cancellation */
  {
    slug: 'refunds',
    title: 'Refund & Cancellation Policy',
    nav: 'Refunds',
    description:
      'How cancellations and refunds work on MANDER’s custom digital projects, including deposits, completed work, third-party costs and defects.',
    lede: 'Custom design and development is made to order. This policy explains plainly what is refundable, what is not, and why — before you pay us anything.',
    sections: [
      {
        h: 'The principle',
        p: [
          'Every MANDER project is custom work produced specifically for one client. It cannot be resold, restocked or reused for anyone else. Once we have begun, our time is spent and cannot be recovered.',
          'For that reason, payments for custom digital work are generally non-refundable once work has commenced. Everything below explains how that applies in practice, and the specific situations where a refund is available.',
        ],
      },
      {
        h: 'Deposits',
        p: [
          'The deposit secures your place in our production schedule, which means turning down or deferring other work for that period. It also funds the discovery and strategy work that happens first.',
          'Before we begin work, a deposit is refundable in full. Once we have started work, or committed resources, scheduling or third-party purchases against your project, the deposit is non-refundable.',
        ],
      },
      {
        h: 'Work already completed',
        p: [
          'Completed work is chargeable. If a project ends early for any reason, you are liable for the work performed up to that point, assessed against the deliverables and stages set out in the agreed scope.',
          'Where you have paid more than the value of the work completed, we refund the difference. Where you have paid less, the balance for completed work is invoiced and payable.',
        ],
      },
      {
        h: 'Third-party and non-refundable costs',
        p: [
          'Costs we incur on your behalf are excluded from any refund, because we cannot recover them ourselves. These commonly include:',
        ],
        ul: [
          'Domain registrations and renewals.',
          'Hosting, platform and infrastructure fees already paid.',
          'Font, stock imagery, plugin and software licences purchased for your project.',
          'Third-party service subscriptions set up at your request.',
          'Payment processing fees already deducted by a payment provider.',
        ],
      },
      {
        h: 'If you cancel',
        p: [
          'Tell us in writing and we will stop work immediately and issue a final statement covering work completed and third-party costs incurred, set against what you have already paid.',
          'Where the balance is in your favour, we refund it. Where the amounts committed exceed what you have paid, the difference is invoiced.',
          'On cancellation, work in progress is not transferred to you unless it has been paid for. Where you have paid for a stage, we will hand over what that stage produced.',
        ],
      },
      {
        h: 'If we cancel',
        p: [
          'If we end a project for reasons other than your breach of the terms or non-payment — for example, we can no longer deliver it to the standard we promised — we will tell you promptly, hand over everything produced to that point at no additional charge, and refund every amount you have paid for work we did not perform.',
          'Where we end a project because of non-payment or a serious breach of the terms by you, the ordinary cancellation position above applies and amounts paid for completed work are not refunded.',
        ],
      },
      {
        h: 'Care plan cancellation',
        p: [
          'The care plan is month-to-month with no lock-in. Cancel at any time and it runs to the end of the month you have paid for; we do not pro-rate part-months. Your site remains yours, and we will help you move hosting elsewhere.',
        ],
      },
      {
        h: 'Defects, and how they differ from preference',
        p: [
          'These two things are treated very differently, so it is worth being precise.',
          'A defect is a genuine fault in what we delivered — something broken, something that does not work as the agreed scope said it would, or work that does not meet the standard of reasonable care and skill. Report a defect and we will correct it at no charge. This is our obligation, not a discretionary gesture, and there is no time limit on us honouring it for a fault that was present at delivery.',
          'A preference change is wanting something different from what was scoped and approved — a new direction, a different look, a change of mind after sign-off, or dissatisfaction with a decision you approved along the way. That is not a defect and is not grounds for a refund. It is quoted as additional work, and your included revision rounds exist precisely so that preferences get resolved before approval.',
        ],
      },
      {
        h: 'Requesting a refund',
        p: [
          `Email ${EMAIL} setting out the project, the amount and the reason. We will respond within a reasonable period, normally a few business days, and we will explain our decision rather than simply issuing one.`,
          'Approved refunds are returned by the original payment method where possible. Timing after we issue it depends on your bank or payment provider and is outside our control.',
        ],
      },
      {
        h: 'Chargebacks',
        p: [
          'If you believe something has gone wrong, please raise it with us first — most problems are quicker to fix directly than through a payment dispute. We would rather correct the work than argue about the invoice.',
        ],
      },
      {
        h: 'Your statutory rights',
        p: [
          'Nothing in this policy removes or limits any right you have under applicable consumer protection law that cannot lawfully be excluded, including rights relating to services not performed with reasonable care and skill.',
          'Where mandatory law in your jurisdiction gives you a stronger right than this policy, that law applies.',
        ],
      },
      CONTACT_SECTION,
    ],
  },

  /* --------------------------------------------------- Shipping/delivery */
  {
    slug: 'shipping',
    title: 'Shipping & Delivery Policy',
    nav: 'Delivery',
    description:
      'MANDER provides digital services delivered electronically. How and when work is delivered, and what affects the timeline.',
    lede: 'MANDER sells digital services, not physical goods. Nothing is shipped — everything is delivered electronically. This page sets out how and when.',
    sections: [
      {
        h: 'No physical shipping',
        p: [
          'MANDER provides websites, website development, brand identity, digital assets, search engine optimisation and related digital services. These are intangible services delivered over the internet.',
          'We do not sell, stock or ship physical products. Ordinary projects therefore involve no shipping, no courier, no tracking number and no delivery address, and no shipping charges are ever applied to an invoice.',
        ],
      },
      {
        h: 'How work is delivered',
        p: ['Depending on what was scoped, delivery takes one or more of these forms:'],
        ul: [
          'A live website published to your domain and hosting.',
          'Access to, and ownership of, the hosting, domain and platform accounts for your project.',
          'Source files and code, transferred by a repository, secure link or cloud folder.',
          'Brand assets — logo files, type and colour specifications and usage guidance — delivered as downloadable files.',
          'Documentation or a walkthrough covering how to run and update what we built.',
        ],
      },
      {
        h: 'Delivery timelines',
        p: [
          'Indicative timelines by plan, measured from the point we have your content and a confirmed scope:',
        ],
        ul: [
          'Launch — around two weeks.',
          'Starter — around three to four weeks.',
          'Growth — around four to six weeks.',
          'Business Pro — around six to ten weeks, depending on complexity.',
        ],
      },
      {
        h: 'These are estimates',
        p: [
          'Timelines are good-faith estimates for the agreed scope, not guaranteed delivery dates, unless we have expressly agreed a fixed date in writing.',
          'In practice the schedule is paced less by our build time than by how quickly content, feedback and approvals come back to us.',
        ],
      },
      {
        h: 'What affects delivery',
        ul: [
          'How quickly you supply content, images, logos and account access.',
          'How quickly feedback and approvals are returned at each stage.',
          'Changes to scope, or additional work agreed mid-project.',
          'Third-party dependencies — hosting, domain transfers, platform migrations, integrations and their support queues.',
          'Domain propagation after a change, which is controlled by the wider internet and typically takes up to 48 hours.',
          'Anything outside our reasonable control, as covered by the force majeure section of our Terms.',
        ],
      },
      {
        h: 'Client and third-party delays',
        p: [
          'Where a project waits on you, the schedule moves by at least the length of the wait — usually a little more, since your slot in our production schedule may have passed to another project in the meantime. We will always tell you when this is happening rather than let a date slip silently.',
          'Where a third party causes the delay, we will chase it, keep you informed and work around it where possible, but we are not liable for their timelines.',
        ],
      },
      {
        h: 'Launch',
        p: [
          'Before anything goes live we test the build across devices and browsers, check the site on mobile, confirm forms and integrations work, and put the technical SEO foundations in place.',
          'We then confirm a launch date with you, publish, and check the live site. After launch we hand over accounts and access, and remain available for a settling-in period to deal with anything that surfaces immediately.',
        ],
      },
      {
        h: 'If delivery is delayed',
        p: [
          'We tell you as soon as we know, explain the cause and give you a revised date. We do not let a deadline pass in silence.',
          'Where a significant delay is our fault, we will agree a fair way forward with you, which may include reprioritising the work or adjusting the fee. Where it is caused by you or by a third party, the timeline moves and the fee is unaffected.',
          'Persistent delay entirely of our making is a matter for the Refund & Cancellation Policy, and your rights under it and under applicable law are unaffected by this page.',
        ],
      },
      CONTACT_SECTION,
    ],
  },
];

export const LEGAL_UPDATED = UPDATED;

export function getLegalDoc(slug) {
  return LEGAL_DOCS.find((d) => d.slug === slug) || null;
}
