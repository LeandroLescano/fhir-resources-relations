export const FHIR_RESOURCES = `[
    {
    "resourceType": "Person",
    // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // A human identifier for this person
      "name" : [{ HumanName }], // A name associated with the person
      "telecom" : [{ ContactPoint }], // A contact detail for the person
      "gender" : "<code>", // male | female | other | unknown
      "birthDate" : "<date>", // The date on which the person was born
      "address" : [{ Address }], // One or more addresses for the person
      "photo" : { Attachment }, // Image of the person
      "managingOrganization" : { Reference(Organization) }, // The organization that is the custodian of the person record
      "active" : <boolean>, // This person's record is in active use
      "link" : [{ // Link to a resource that concerns the same actual person
        "target" : { Reference(Patient|Practitioner|RelatedPerson|Person) }, // R!  The resource to which this actual person is associated
        "assurance" : "<code>" // level1 | level2 | level3 | level4
      }]
    },
    {
     "resourceType" : "Patient",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // An identifier for this patient
      "active" : <boolean>, // Whether this patient's record is in active use
      "name" : [{ HumanName }], // A name associated with the patient
      "telecom" : [{ ContactPoint }], // A contact detail for the individual
      "gender" : "<code>", // male | female | other | unknown
      "birthDate" : "<date>", // The date of birth for the individual
      // deceased[x]: Indicates if the individual is deceased or not. One of these 2:
      "deceasedBoolean" : <boolean>,
      "deceasedDateTime" : "<dateTime>",
      "address" : [{ Address }], // An address for the individual
      "maritalStatus" : { CodeableConcept }, // Marital (civil) status of a patient
      // multipleBirth[x]: Whether patient is part of a multiple birth. One of these 2:
      "multipleBirthBoolean" : <boolean>,
      "multipleBirthInteger" : <integer>,
      "photo" : [{ Attachment }], // Image of the patient
      "contact" : [{ // A contact party (e.g. guardian, partner, friend) for the patient
        "relationship" : [{ CodeableConcept }], // The kind of relationship
        "name" : { HumanName }, // A name associated with the contact person
        "telecom" : [{ ContactPoint }], // A contact detail for the person
        "address" : { Address }, // Address for the contact person
        "gender" : "<code>", // male | female | other | unknown
        "organization" : { Reference(Organization) }, // C? Organization that is associated with the contact
        "period" : { Period } // The period during which this contact person or organization is valid to be contacted relating to this patient
      }],
      "communication" : [{ // A language which may be used to communicate with the patient about his or her health
        "language" : { CodeableConcept }, // R!  The language which can be used to communicate with the patient about his or her health
        "preferred" : <boolean> // Language preference indicator
      }],
      "generalPractitioner" : [{ Reference(Organization|Practitioner|
       PractitionerRole) }], // Patient's nominated primary care provider
      "managingOrganization" : { Reference(Organization) }, // Organization that is the custodian of the patient record
      "link" : [{ // Link to another patient resource that concerns the same actual person
        "other" : { Reference(Patient|RelatedPerson) }, // R!  The other patient or related person resource that the link refers to
        "type" : "<code>" // R!  replaced-by | replaces | refer | seealso
      }]
    },

    {
      "resourceType" : "RelatedPerson",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // A human identifier for this person
      "active" : <boolean>, // Whether this related person's record is in active use
      "patient" : { Reference(Patient) }, // R!  The patient this person is related to
      "relationship" : [{ CodeableConcept }], // The nature of the relationship
      "name" : [{ HumanName }], // A name associated with the person
      "telecom" : [{ ContactPoint }], // A contact detail for the person
      "gender" : "<code>", // male | female | other | unknown
      "birthDate" : "<date>", // The date on which the related person was born
      "address" : [{ Address }], // Address where the related person can be contacted or visited
      "photo" : [{ Attachment }], // Image of the person
      "period" : { Period }, // Period of time that this relationship is considered valid
      "communication" : [{ // A language which may be used to communicate with about the patient's health
        "language" : { CodeableConcept }, // R!  The language which can be used to communicate with the patient about his or her health
        "preferred" : <boolean> // Language preference indicator
      }]
    },
    {
     "resourceType" : "Practitioner",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // An identifier for the person as this agent
      "active" : <boolean>, // Whether this practitioner's record is in active use
      "name" : [{ HumanName }], // The name(s) associated with the practitioner
      "telecom" : [{ ContactPoint }], // A contact detail for the practitioner (that apply to all roles)
      "address" : [{ Address }], // Address(es) of the practitioner that are not role specific (typically home address)
      "gender" : "<code>", // male | female | other | unknown
      "birthDate" : "<date>", // The date  on which the practitioner was born
      "photo" : [{ Attachment }], // Image of the person
      "qualification" : [{ // Certification, licenses, or training pertaining to the provision of care
        "identifier" : [{ Identifier }], // An identifier for this qualification for the practitioner
        "code" : { CodeableConcept }, // R!  Coded representation of the qualification
        "period" : { Period }, // Period during which the qualification is valid
        "issuer" : { Reference(Organization) } // Organization that regulates and issues the qualification
      }],
      "communication" : [{ CodeableConcept }] // A language the practitioner can use in patient communication
    },
    {
    "resourceType" : "PractitionerRole",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // Business Identifiers that are specific to a role/location
      "active" : <boolean>, // Whether this practitioner role record is in active use
      "period" : { Period }, // The period during which the practitioner is authorized to perform in these role(s)
      "practitioner" : { Reference(Practitioner) }, // Practitioner that is able to provide the defined services for the organization
      "organization" : { Reference(Organization) }, // Organization where the roles are available
      "code" : [{ CodeableConcept }], // Roles which this practitioner may perform
      "specialty" : [{ CodeableConcept }], // Specific specialty of the practitioner
      "location" : [{ Reference(Location) }], // The location(s) at which this practitioner provides care
      "healthcareService" : [{ Reference(HealthcareService) }], // The list of healthcare services that this worker provides for this role's Organization/Location(s)
      "telecom" : [{ ContactPoint }], // Contact details that are specific to the role/location/service
      "availableTime" : [{ // Times the Service Site is available
        "daysOfWeek" : ["<code>"], // mon | tue | wed | thu | fri | sat | sun
        "allDay" : <boolean>, // Always available? e.g. 24 hour service
        "availableStartTime" : "<time>", // Opening time of day (ignored if allDay = true)
        "availableEndTime" : "<time>" // Closing time of day (ignored if allDay = true)
      }],
      "notAvailable" : [{ // Not available during this time due to provided reason
        "description" : "<string>", // R!  Reason presented to the user explaining why time not available
        "during" : { Period } // Service not available from this date
      }],
      "availabilityExceptions" : "<string>", // Description of availability exceptions
      "endpoint" : [{ Reference(Endpoint) }] // Technical endpoints providing access to services operated for the practitioner with this role
    },
    {
     "resourceType" : "Organization",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // C? Identifies this organization  across multiple systems
      "active" : <boolean>, // Whether the organization's record is still in active use
      "type" : [{ CodeableConcept }], // Kind of organization
      "name" : "<string>", // C? Name used for the organization
      "alias" : ["<string>"], // A list of alternate names that the organization is known as, or was known as in the past
      "telecom" : [{ ContactPoint }], // C? A contact detail for the organization
      "address" : [{ Address }], // C? An address for the organization
      "partOf" : { Reference(Organization) }, // The organization of which this organization forms a part
      "contact" : [{ // Contact for the organization for a certain purpose
        "purpose" : { CodeableConcept }, // The type of contact
        "name" : { HumanName }, // A name associated with the contact
        "telecom" : [{ ContactPoint }], // Contact details (telephone, email, etc.)  for a contact
        "address" : { Address } // Visiting or postal addresses for the contact
      }],
      "endpoint" : [{ Reference(Endpoint) }] // Technical endpoints providing access to services operated for the organization
    },
    { "resourceType" : "HealthcareService",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External identifiers for this item
      "active" : <boolean>, // Whether this HealthcareService record is in active use
      "providedBy" : { Reference(Organization) }, // Organization that provides this service
      "category" : [{ CodeableConcept }], // Broad category of service being performed or delivered
      "type" : [{ CodeableConcept }], // Type of service that may be delivered or performed
      "specialty" : [{ CodeableConcept }], // Specialties handled by the HealthcareService
      "location" : [{ Reference(Location) }], // Location(s) where service may be provided
      "name" : "<string>", // Description of service as presented to a consumer while searching
      "comment" : "<string>", // Additional description and/or any specific issues not covered elsewhere
      "extraDetails" : "<markdown>", // Extra details about the service that can't be placed in the other fields
      "photo" : { Attachment }, // Facilitates quick identification of the service
      "telecom" : [{ ContactPoint }], // Contacts related to the healthcare service
      "coverageArea" : [{ Reference(Location) }], // Location(s) service is intended for/available to
      "serviceProvisionCode" : [{ CodeableConcept }], // Conditions under which service is available/offered
      "eligibility" : [{ // Specific eligibility requirements required to use the service
        "code" : { CodeableConcept }, // Coded value for the eligibility
        "comment" : "<markdown>" // Describes the eligibility conditions for the service
      }],
      "program" : [{ CodeableConcept }], // Programs that this service is applicable to
      "characteristic" : [{ CodeableConcept }], // Collection of characteristics (attributes)
      "communication" : [{ CodeableConcept }], // The language that this service is offered in
      "referralMethod" : [{ CodeableConcept }], // Ways that the service accepts referrals
      "appointmentRequired" : <boolean>, // If an appointment is required for access to this service
      "availableTime" : [{ // Times the Service Site is available
        "daysOfWeek" : ["<code>"], // mon | tue | wed | thu | fri | sat | sun
        "allDay" : <boolean>, // Always available? e.g. 24 hour service
        "availableStartTime" : "<time>", // Opening time of day (ignored if allDay = true)
        "availableEndTime" : "<time>" // Closing time of day (ignored if allDay = true)
      }],
      "notAvailable" : [{ // Not available during this time due to provided reason
        "description" : "<string>", // R!  Reason presented to the user explaining why time not available
        "during" : { Period } // Service not available from this date
      }],
      "availabilityExceptions" : "<string>", // Description of availability exceptions
      "endpoint" : [{ Reference(Endpoint) }] // Technical endpoints providing access to electronic services operated for the healthcare service
    },
    {
     "resourceType" : "Location",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // Unique code or number identifying the location to its users
      "status" : "<code>", // active | suspended | inactive
      "operationalStatus" : { Coding }, // The operational status of the location (typically only for a bed/room)
      "name" : "<string>", // Name of the location as used by humans
      "alias" : ["<string>"], // A list of alternate names that the location is known as, or was known as, in the past
      "description" : "<string>", // Additional details about the location that could be displayed as further information to identify the location beyond its name
      "mode" : "<code>", // instance | kind
      "type" : [{ CodeableConcept }], // Type of function performed
      "telecom" : [{ ContactPoint }], // Contact details of the location
      "address" : { Address }, // Physical location
      "physicalType" : { CodeableConcept }, // Physical form of the location
      "position" : { // The absolute geographic location
        "longitude" : <decimal>, // R!  Longitude with WGS84 datum
        "latitude" : <decimal>, // R!  Latitude with WGS84 datum
        "altitude" : <decimal> // Altitude with WGS84 datum
      },
      "managingOrganization" : { Reference(Organization) }, // Organization responsible for provisioning and upkeep
      "partOf" : { Reference(Location) }, // Another Location this one is physically a part of
      "hoursOfOperation" : [{ // What days/times during a week is this location usually open
        "daysOfWeek" : ["<code>"], // mon | tue | wed | thu | fri | sat | sun
        "allDay" : <boolean>, // The Location is open all day
        "openingTime" : "<time>", // Time that the Location opens
        "closingTime" : "<time>" // Time that the Location closes
      }],
      "availabilityExceptions" : "<string>", // Description of availability exceptions
      "endpoint" : [{ Reference(Endpoint) }] // Technical endpoints providing access to services operated for the location
    },
    {
    "resourceType" : "Coverage",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // Business Identifier for the coverage
      "status" : "<code>", // R!  active | cancelled | draft | entered-in-error
      "type" : { CodeableConcept }, // Coverage category such as medical or accident
      "policyHolder" : { Reference(Patient|RelatedPerson|Organization) }, // Owner of the policy
      "subscriber" : { Reference(Patient|RelatedPerson) }, // Subscriber to the policy
      "subscriberId" : "<string>", // ID assigned to the subscriber
      "beneficiary" : { Reference(Patient) }, // R!  Plan beneficiary
      "dependent" : "<string>", // Dependent number
      "relationship" : { CodeableConcept }, // Beneficiary relationship to the subscriber
      "period" : { Period }, // Coverage start and end dates
      "payor" : [{ Reference(Organization|Patient|RelatedPerson) }], // R!  Issuer of the policy
      "class" : [{ // Additional coverage classifications
        "type" : { CodeableConcept }, // R!  Type of class such as 'group' or 'plan'
        "value" : "<string>", // R!  Value associated with the type
        "name" : "<string>" // Human readable description of the type and value
      }],
      "order" : "<positiveInt>", // Relative order of the coverage
      "network" : "<string>", // Insurer network
      "costToBeneficiary" : [{ // Patient payments for services/products
        "type" : { CodeableConcept }, // Cost category
        // value[x]: The amount or percentage due from the beneficiary. One of these 2:
        "valueQuantity" : { Quantity(SimpleQuantity) },
        "valueMoney" : { Money },
        "exception" : [{ // Exceptions for patient payments
          "type" : { CodeableConcept }, // R!  Exception category
          "period" : { Period } // The effective period of the exception
        }]
      }],
      "subrogation" : <boolean>, // Reimbursement to insurer
      "contract" : [{ Reference(Contract) }] // Contract details
    },
    {
     "resourceType" : "MedicationRequest",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External ids for this request
      "status" : "<code>", // R!  active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
      "statusReason" : { CodeableConcept }, // Reason for current status
      "intent" : "<code>", // R!  proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
      "category" : [{ CodeableConcept }], // Type of medication usage
      "priority" : "<code>", // routine | urgent | asap | stat
      "doNotPerform" : <boolean>, // True if request is prohibiting action
      // reported[x]: Reported rather than primary record. One of these 2:
      "reportedBoolean" : <boolean>,
      "reportedReference" : { Reference(Patient|Practitioner|PractitionerRole|
       RelatedPerson|Organization) },
      // medication[x]: Medication to be taken. One of these 2:
      "medicationCodeableConcept" : { CodeableConcept },
      "medicationReference" : { Reference(Medication) },
      "subject" : { Reference(Patient|Group) }, // R!  Who or group medication request is for
      "encounter" : { Reference(Encounter) }, // Encounter created as part of encounter/admission/stay
      "supportingInformation" : [{ Reference(Any) }], // Information to support ordering of the medication
      "authoredOn" : "<dateTime>", // When request was initially authored
      "requester" : { Reference(Practitioner|PractitionerRole|Organization|
       Patient|RelatedPerson|Device) }, // Who/What requested the Request
      "performer" : { Reference(Practitioner|PractitionerRole|Organization|
       Patient|Device|RelatedPerson|CareTeam) }, // Intended performer of administration
      "performerType" : { CodeableConcept }, // Desired kind of performer of the medication administration
      "recorder" : { Reference(Practitioner|PractitionerRole) }, // Person who entered the request
      "reasonCode" : [{ CodeableConcept }], // Reason or indication for ordering or not ordering the medication
      "reasonReference" : [{ Reference(Condition|Observation) }], // Condition or observation that supports why the prescription is being written
      "instantiatesCanonical" : ["<canonical>"], // Instantiates FHIR protocol or definition
      "instantiatesUri" : ["<uri>"], // Instantiates external protocol or definition
      "basedOn" : [{ Reference(CarePlan|MedicationRequest|ServiceRequest|
       ImmunizationRecommendation) }], // What request fulfills
      "groupIdentifier" : { Identifier }, // Composite request this is part of
      "courseOfTherapyType" : { CodeableConcept }, // Overall pattern of medication administration
      "insurance" : [{ Reference(Coverage|ClaimResponse) }], // Associated insurance coverage
      "note" : [{ Annotation }], // Information about the prescription
      "dosageInstruction" : [{ Dosage }], // How the medication should be taken
      "dispenseRequest" : { // Medication supply authorization
        "initialFill" : { // First fill details
          "quantity" : { Quantity(SimpleQuantity) }, // First fill quantity
          "duration" : { Duration } // First fill duration
        },
        "dispenseInterval" : { Duration }, // Minimum period of time between dispenses
        "validityPeriod" : { Period }, // Time period supply is authorized for
        "numberOfRepeatsAllowed" : "<unsignedInt>", // Number of refills authorized
        "quantity" : { Quantity(SimpleQuantity) }, // Amount of medication to supply per dispense
        "expectedSupplyDuration" : { Duration }, // Number of days supply per dispense
        "performer" : { Reference(Organization) } // Intended dispenser
      },
      "substitution" : { // Any restrictions on medication substitution
        // allowed[x]: Whether substitution is allowed or not. One of these 2:
        "allowedBoolean" : <boolean>,
        "allowedCodeableConcept" : { CodeableConcept },
        "reason" : { CodeableConcept } // Why should (not) substitution be made
      },
      "priorPrescription" : { Reference(MedicationRequest) }, // An order/prescription that is being replaced
      "detectedIssue" : [{ Reference(DetectedIssue) }], // Clinical Issue with action
      "eventHistory" : [{ Reference(Provenance) }] // A list of events of interest in the lifecycle
    },
    {
    "resourceType" : "Observation",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // Business Identifier for observation
      "basedOn" : [{ Reference(CarePlan|DeviceRequest|ImmunizationRecommendation|
       MedicationRequest|NutritionOrder|ServiceRequest) }], // Fulfills plan, proposal or order
      "partOf" : [{ Reference(MedicationAdministration|MedicationDispense|
       MedicationStatement|Procedure|Immunization|ImagingStudy) }], // Part of referenced event
      "status" : "<code>", // R!  registered | preliminary | final | amended +
      "category" : [{ CodeableConcept }], // Classification of  type of observation
      "code" : { CodeableConcept }, // R!  Type of observation (code / type)
      "subject" : { Reference(Patient|Group|Device|Location) }, // Who and/or what the observation is about
      "focus" : [{ Reference(Any) }], // What the observation is about, when it is not about the subject of record
      "encounter" : { Reference(Encounter) }, // Healthcare event during which this observation is made
      // effective[x]: Clinically relevant time/time-period for observation. One of these 4:
      "effectiveDateTime" : "<dateTime>",
      "effectivePeriod" : { Period },
      "effectiveTiming" : { Timing },
      "effectiveInstant" : "<instant>",
      "issued" : "<instant>", // Date/Time this version was made available
      "performer" : [{ Reference(Practitioner|PractitionerRole|Organization|
       CareTeam|Patient|RelatedPerson) }], // Who is responsible for the observation
      // value[x]: Actual result. One of these 11:
      "valueQuantity" : { Quantity },
      "valueCodeableConcept" : { CodeableConcept },
      "valueString" : "<string>",
      "valueBoolean" : <boolean>,
      "valueInteger" : <integer>,
      "valueRange" : { Range },
      "valueRatio" : { Ratio },
      "valueSampledData" : { SampledData },
      "valueTime" : "<time>",
      "valueDateTime" : "<dateTime>",
      "valuePeriod" : { Period },
      "dataAbsentReason" : { CodeableConcept }, // C? Why the result is missing
      "interpretation" : [{ CodeableConcept }], // High, low, normal, etc.
      "note" : [{ Annotation }], // Comments about the observation
      "bodySite" : { CodeableConcept }, // Observed body part
      "method" : { CodeableConcept }, // How it was done
      "specimen" : { Reference(Specimen) }, // Specimen used for this observation
      "device" : { Reference(Device|DeviceMetric) }, // (Measurement) Device
      "referenceRange" : [{ // Provides guide for interpretation
        "low" : { Quantity(SimpleQuantity) }, // C? Low Range, if relevant
        "high" : { Quantity(SimpleQuantity) }, // C? High Range, if relevant
        "type" : { CodeableConcept }, // Reference range qualifier
        "appliesTo" : [{ CodeableConcept }], // Reference range population
        "age" : { Range }, // Applicable age range, if relevant
        "text" : "<string>" // Text based reference range in an observation
      }],
      "hasMember" : [{ Reference(Observation|QuestionnaireResponse|
       MolecularSequence) }], // Related resource that belongs to the Observation group
      "derivedFrom" : [{ Reference(DocumentReference|ImagingStudy|Media|
       QuestionnaireResponse|Observation|MolecularSequence) }], // Related measurements the observation is made from
      "component" : [{ // Component results
        "code" : { CodeableConcept }, // R!  Type of component observation (code / type)
        // value[x]: Actual component result. One of these 11:
        "valueQuantity" : { Quantity },
        "valueCodeableConcept" : { CodeableConcept },
        "valueString" : "<string>",
        "valueBoolean" : <boolean>,
        "valueInteger" : <integer>,
        "valueRange" : { Range },
        "valueRatio" : { Ratio },
        "valueSampledData" : { SampledData },
        "valueTime" : "<time>",
        "valueDateTime" : "<dateTime>",
        "valuePeriod" : { Period },
        "dataAbsentReason" : { CodeableConcept }, // C? Why the component result is missing
        "interpretation" : [{ CodeableConcept }], // High, low, normal, etc.
        "referenceRange" : [{ Content as for Observation.referenceRange }] // Provides guide for interpretation of component result
      }]
    },
    {
     "resourceType" : "Condition",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External Ids for this condition
      "clinicalStatus" : { CodeableConcept }, // C? active | recurrence | relapse | inactive | remission | resolved
      "verificationStatus" : { CodeableConcept }, // C? unconfirmed | provisional | differential | confirmed | refuted | entered-in-error
      "category" : [{ CodeableConcept }], // problem-list-item | encounter-diagnosis
      "severity" : { CodeableConcept }, // Subjective severity of condition
      "code" : { CodeableConcept }, // Identification of the condition, problem or diagnosis
      "bodySite" : [{ CodeableConcept }], // Anatomical location, if relevant
      "subject" : { Reference(Patient|Group) }, // R!  Who has the condition?
      "encounter" : { Reference(Encounter) }, // Encounter created as part of
      // onset[x]: Estimated or actual date,  date-time, or age. One of these 5:
      "onsetDateTime" : "<dateTime>",
      "onsetAge" : { Age },
      "onsetPeriod" : { Period },
      "onsetRange" : { Range },
      "onsetString" : "<string>",
      // abatement[x]: When in resolution/remission. One of these 5:
      "abatementDateTime" : "<dateTime>",
      "abatementAge" : { Age },
      "abatementPeriod" : { Period },
      "abatementRange" : { Range },
      "abatementString" : "<string>",
      "recordedDate" : "<dateTime>", // Date record was first recorded
      "recorder" : { Reference(Practitioner|PractitionerRole|Patient|
       RelatedPerson) }, // Who recorded the condition
      "asserter" : { Reference(Practitioner|PractitionerRole|Patient|
       RelatedPerson) }, // Person who asserts this condition
      "stage" : [{ // Stage/grade, usually assessed formally
        "summary" : { CodeableConcept }, // C? Simple summary (disease specific)
        "assessment" : [{ Reference(ClinicalImpression|DiagnosticReport|Observation) }], // C? Formal record of assessment
        "type" : { CodeableConcept } // Kind of staging
      }],
      "evidence" : [{ // Supporting evidence
        "code" : [{ CodeableConcept }], // C? Manifestation/symptom
        "detail" : [{ Reference(Any) }] // C? Supporting information found elsewhere
      }],
      "note" : [{ Annotation }] // Additional information about the Condition
    },
    {
    "resourceType" : "CarePlan",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External Ids for this plan
      "instantiatesCanonical" : [{ canonical(PlanDefinition|Questionnaire|Measure|
       ActivityDefinition|OperationDefinition) }], // Instantiates FHIR protocol or definition
      "instantiatesUri" : ["<uri>"], // Instantiates external protocol or definition
      "basedOn" : [{ Reference(CarePlan) }], // Fulfills CarePlan
      "replaces" : [{ Reference(CarePlan) }], // CarePlan replaced by this CarePlan
      "partOf" : [{ Reference(CarePlan) }], // Part of referenced CarePlan
      "status" : "<code>", // R!  draft | active | on-hold | revoked | completed | entered-in-error | unknown
      "intent" : "<code>", // R!  proposal | plan | order | option
      "category" : [{ CodeableConcept }], // Type of plan
      "title" : "<string>", // Human-friendly name for the care plan
      "description" : "<string>", // Summary of nature of plan
      "subject" : { Reference(Patient|Group) }, // R!  Who the care plan is for
      "encounter" : { Reference(Encounter) }, // Encounter created as part of
      "period" : { Period }, // Time period plan covers
      "created" : "<dateTime>", // Date record was first recorded
      "author" : { Reference(Patient|Practitioner|PractitionerRole|Device|
       RelatedPerson|Organization|CareTeam) }, // Who is the designated responsible party
      "contributor" : [{ Reference(Patient|Practitioner|PractitionerRole|Device|
       RelatedPerson|Organization|CareTeam) }], // Who provided the content of the care plan
      "careTeam" : [{ Reference(CareTeam) }], // Who's involved in plan?
      "addresses" : [{ Reference(Condition) }], // Health issues this plan addresses
      "supportingInfo" : [{ Reference(Any) }], // Information considered as part of plan
      "goal" : [{ Reference(Goal) }], // Desired outcome of plan
      "activity" : [{ // Action to occur as part of plan
        "outcomeCodeableConcept" : [{ CodeableConcept }], // Results of the activity
        "outcomeReference" : [{ Reference(Any) }], // Appointment, Encounter, Procedure, etc.
        "progress" : [{ Annotation }], // Comments about the activity status/progress
        "reference" : { Reference(Appointment|CommunicationRequest|DeviceRequest|
        MedicationRequest|NutritionOrder|Task|ServiceRequest|VisionPrescription|
        RequestGroup) }, // C? Activity details defined in specific resource
        "detail" : { // C? In-line definition of activity
          "kind" : "<code>", // Appointment | CommunicationRequest | DeviceRequest | MedicationRequest | NutritionOrder | Task | ServiceRequest | VisionPrescription
          "instantiatesCanonical" : [{ canonical(PlanDefinition|ActivityDefinition|
         Questionnaire|Measure|OperationDefinition) }], // Instantiates FHIR protocol or definition
          "instantiatesUri" : ["<uri>"], // Instantiates external protocol or definition
          "code" : { CodeableConcept }, // Detail type of activity
          "reasonCode" : [{ CodeableConcept }], // Why activity should be done or why activity was prohibited
          "reasonReference" : [{ Reference(Condition|Observation|DiagnosticReport|
         DocumentReference) }], // Why activity is needed
          "goal" : [{ Reference(Goal) }], // Goals this activity relates to
          "status" : "<code>", // R!  not-started | scheduled | in-progress | on-hold | completed | cancelled | stopped | unknown | entered-in-error
          "statusReason" : { CodeableConcept }, // Reason for current status
          "doNotPerform" : <boolean>, // If true, activity is prohibiting action
          // scheduled[x]: When activity is to occur. One of these 3:
          "scheduledTiming" : { Timing },
          "scheduledPeriod" : { Period },
          "scheduledString" : "<string>",
          "location" : { Reference(Location) }, // Where it should happen
          "performer" : [{ Reference(Practitioner|PractitionerRole|Organization|
         RelatedPerson|Patient|CareTeam|HealthcareService|Device) }], // Who will be responsible?
          // product[x]: What is to be administered/supplied. One of these 2:
          "productCodeableConcept" : { CodeableConcept },
          "productReference" : { Reference(Medication|Substance) },
          "dailyAmount" : { Quantity(SimpleQuantity) }, // How to consume/day?
          "quantity" : { Quantity(SimpleQuantity) }, // How much to administer/supply/consume
          "description" : "<string>" // Extra info describing activity to perform
        }
      }],
      "note" : [{ Annotation }] // Comments about the plan
    },
    {
     "resourceType" : "Appointment",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External Ids for this item
      "status" : "<code>", // R!  proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist
      "cancelationReason" : { CodeableConcept }, // The coded reason for the appointment being cancelled
      "serviceCategory" : [{ CodeableConcept }], // A broad categorization of the service that is to be performed during this appointment
      "serviceType" : [{ CodeableConcept }], // The specific service that is to be performed during this appointment
      "specialty" : [{ CodeableConcept }], // The specialty of a practitioner that would be required to perform the service requested in this appointment
      "appointmentType" : { CodeableConcept }, // The style of appointment or patient that has been booked in the slot (not service type)
      "reasonCode" : [{ CodeableConcept }], // Coded reason this appointment is scheduled
      "reasonReference" : [{ Reference(Condition|Procedure|Observation|
       ImmunizationRecommendation) }], // Reason the appointment is to take place (resource)
      "priority" : "<unsignedInt>", // Used to make informed decisions if needing to re-prioritize
      "description" : "<string>", // Shown on a subject line in a meeting request, or appointment list
      "supportingInformation" : [{ Reference(Any) }], // Additional information to support the appointment
      "start" : "<instant>", // When appointment is to take place
      "end" : "<instant>", // When appointment is to conclude
      "minutesDuration" : "<positiveInt>", // Can be less than start/end (e.g. estimate)
      "slot" : [{ Reference(Slot) }], // The slots that this appointment is filling
      "created" : "<dateTime>", // The date that this appointment was initially created
      "comment" : "<string>", // Additional comments
      "patientInstruction" : "<string>", // Detailed information and instructions for the patient
      "basedOn" : [{ Reference(ServiceRequest) }], // The service request this appointment is allocated to assess
      "participant" : [{ // R!  Participants involved in appointment
        "type" : [{ CodeableConcept }], // Role of participant in the appointment
        "actor" : { Reference(Patient|Practitioner|PractitionerRole|RelatedPerson|
        Device|HealthcareService|Location) }, // Person, Location/HealthcareService or Device
        "required" : "<code>", // required | optional | information-only
        "status" : "<code>", // R!  accepted | declined | tentative | needs-action
        "period" : { Period } // Participation period of the actor
      }],
      "requestedPeriod" : [{ Period }] // Potential date/time interval(s) requested to allocate the appointment within
    },
    {
     "resourceType" : "AppointmentResponse",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External Ids for this item
      "appointment" : { Reference(Appointment) }, // R!  Appointment this response relates to
      "start" : "<instant>", // Time from appointment, or requested new start time
      "end" : "<instant>", // Time from appointment, or requested new end time
      "participantType" : [{ CodeableConcept }], // Role of participant in the appointment
      "actor" : { Reference(Patient|Practitioner|PractitionerRole|RelatedPerson|
       Device|HealthcareService|Location) }, // Person, Location, HealthcareService, or Device
      "participantStatus" : "<code>", // R!  accepted | declined | tentative | needs-action
      "comment" : "<string>" // Additional comments
    },
    {
     "resourceType" : "Schedule",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External Ids for this item
      "active" : <boolean>, // Whether this schedule is in active use
      "serviceCategory" : [{ CodeableConcept }], // High-level category
      "serviceType" : [{ CodeableConcept }], // Specific service
      "specialty" : [{ CodeableConcept }], // Type of specialty needed
      "actor" : [{ Reference(Patient|Practitioner|PractitionerRole|RelatedPerson|
       Device|HealthcareService|Location) }], // R!  Resource(s) that availability information is being provided for
      "planningHorizon" : { Period }, // Period of time covered by schedule
      "comment" : "<string>" // Comments on availability
    },
    {
     "resourceType" : "Slot",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // External Ids for this item
      "serviceCategory" : [{ CodeableConcept }], // A broad categorization of the service that is to be performed during this appointment
      "serviceType" : [{ CodeableConcept }], // The type of appointments that can be booked into this slot (ideally this would be an identifiable service - which is at a location, rather than the location itself). If provided then this overrides the value provided on the availability resource
      "specialty" : [{ CodeableConcept }], // The specialty of a practitioner that would be required to perform the service requested in this appointment
      "appointmentType" : { CodeableConcept }, // The style of appointment or patient that may be booked in the slot (not service type)
      "schedule" : { Reference(Schedule) }, // R!  The schedule resource that this slot defines an interval of status information
      "status" : "<code>", // R!  busy | free | busy-unavailable | busy-tentative | entered-in-error
      "start" : "<instant>", // R!  Date/Time that the slot is to begin
      "end" : "<instant>", // R!  Date/Time that the slot is to conclude
      "overbooked" : <boolean>, // This slot has already been overbooked, appointments are unlikely to be accepted for this time
      "comment" : "<string>" // Comments on the slot to describe any extended information. Such as custom constraints on the slot
    },
    {
    "resourceType" : "Encounter",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // Identifier(s) by which this encounter is known
      "status" : "<code>", // R!  planned | arrived | triaged | in-progress | onleave | finished | cancelled +
      "statusHistory" : [{ // List of past encounter statuses
        "status" : "<code>", // R!  planned | arrived | triaged | in-progress | onleave | finished | cancelled +
        "period" : { Period } // R!  The time that the episode was in the specified status
      }],
      "class" : { Coding }, // R!  Classification of patient encounter
      "classHistory" : [{ // List of past encounter classes
        "class" : { Coding }, // R!  inpatient | outpatient | ambulatory | emergency +
        "period" : { Period } // R!  The time that the episode was in the specified class
      }],
      "type" : [{ CodeableConcept }], // Specific type of encounter
      "serviceType" : { CodeableConcept }, // Specific type of service
      "priority" : { CodeableConcept }, // Indicates the urgency of the encounter
      "subject" : { Reference(Patient|Group) }, // The patient or group present at the encounter
      "episodeOfCare" : [{ Reference(EpisodeOfCare) }], // Episode(s) of care that this encounter should be recorded against
      "basedOn" : [{ Reference(ServiceRequest) }], // The ServiceRequest that initiated this encounter
      "participant" : [{ // List of participants involved in the encounter
        "type" : [{ CodeableConcept }], // Role of participant in encounter
        "period" : { Period }, // Period of time during the encounter that the participant participated
        "individual" : { Reference(Practitioner|PractitionerRole|RelatedPerson) } // Persons involved in the encounter other than the patient
      }],
      "appointment" : [{ Reference(Appointment) }], // The appointment that scheduled this encounter
      "period" : { Period }, // The start and end time of the encounter
      "length" : { Duration }, // Quantity of time the encounter lasted (less time absent)
      "reasonCode" : [{ CodeableConcept }], // Coded reason the encounter takes place
      "reasonReference" : [{ Reference(Condition|Procedure|Observation|
       ImmunizationRecommendation) }], // Reason the encounter takes place (reference)
      "diagnosis" : [{ // The list of diagnosis relevant to this encounter
        "condition" : { Reference(Condition|Procedure) }, // R!  The diagnosis or procedure relevant to the encounter
        "use" : { CodeableConcept }, // Role that this diagnosis has within the encounter (e.g. admission, billing, discharge â€¦)
        "rank" : "<positiveInt>" // Ranking of the diagnosis (for each role type)
      }],
      "account" : [{ Reference(Account) }], // The set of accounts that may be used for billing for this Encounter
      "hospitalization" : { // Details about the admission to a healthcare service
        "preAdmissionIdentifier" : { Identifier }, // Pre-admission identifier
        "origin" : { Reference(Location|Organization) }, // The location/organization from which the patient came before admission
        "admitSource" : { CodeableConcept }, // From where patient was admitted (physician referral, transfer)
        "reAdmission" : { CodeableConcept }, // The type of hospital re-admission that has occurred (if any). If the value is absent, then this is not identified as a readmission
        "dietPreference" : [{ CodeableConcept }], // Diet preferences reported by the patient
        "specialCourtesy" : [{ CodeableConcept }], // Special courtesies (VIP, board member)
        "specialArrangement" : [{ CodeableConcept }], // Wheelchair, translator, stretcher, etc.
        "destination" : { Reference(Location|Organization) }, // Location/organization to which the patient is discharged
        "dischargeDisposition" : { CodeableConcept } // Category or kind of location after discharge
      },
      "location" : [{ // List of locations where the patient has been
        "location" : { Reference(Location) }, // R!  Location the encounter takes place
        "status" : "<code>", // planned | active | reserved | completed
        "physicalType" : { CodeableConcept }, // The physical type of the location (usually the level in the location hierachy - bed room ward etc.)
        "period" : { Period } // Time period during which the patient was present at the location
      }],
      "serviceProvider" : { Reference(Organization) }, // The organization (facility) responsible for this encounter
      "partOf" : { Reference(Encounter) } // Another Encounter this encounter is part of
    },
    {
     "resourceType" : "Composition",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : { Identifier }, // Version-independent identifier for the Composition
      "status" : "<code>", // R!  preliminary | final | amended | entered-in-error
      "type" : { CodeableConcept }, // R!  Kind of composition (LOINC if possible)
      "category" : [{ CodeableConcept }], // Categorization of Composition
      "subject" : { Reference(Any) }, // Who and/or what the composition is about
      "encounter" : { Reference(Encounter) }, // Context of the Composition
      "date" : "<dateTime>", // R!  Composition editing time
      "author" : [{ Reference(Practitioner|PractitionerRole|Device|Patient|
       RelatedPerson|Organization) }], // R!  Who and/or what authored the composition
      "title" : "<string>", // R!  Human Readable name/title
      "confidentiality" : "<code>", // As defined by affinity domain
      "attester" : [{ // Attests to accuracy of composition
        "mode" : "<code>", // R!  personal | professional | legal | official
        "time" : "<dateTime>", // When the composition was attested
        "party" : { Reference(Patient|RelatedPerson|Practitioner|PractitionerRole|
        Organization) } // Who attested the composition
      }],
      "custodian" : { Reference(Organization) }, // Organization which maintains the composition
      "relatesTo" : [{ // Relationships to other compositions/documents
        "code" : "<code>", // R!  replaces | transforms | signs | appends
        // target[x]: Target of the relationship. One of these 2:
        "targetIdentifier" : { Identifier }
        "targetReference" : { Reference(Composition) }
      }],
      "event" : [{ // The clinical service(s) being documented
        "code" : [{ CodeableConcept }], // Code(s) that apply to the event being documented
        "period" : { Period }, // The period covered by the documentation
        "detail" : [{ Reference(Any) }] // The event(s) being documented
      }],
      "section" : [{ // Composition is broken into sections
        "title" : "<string>", // Label for section (e.g. for ToC)
        "code" : { CodeableConcept }, // Classification of section (recommended)
        "author" : [{ Reference(Practitioner|PractitionerRole|Device|Patient|
        RelatedPerson|Organization) }], // Who and/or what authored the section
        "focus" : { Reference(Any) }, // Who/what the section is about, when it is not about the subject of composition
        "text" : { Narrative }, // C? Text summary of the section, for human interpretation
        "mode" : "<code>", // working | snapshot | changes
        "orderedBy" : { CodeableConcept }, // Order of section entries
        "entry" : [{ Reference(Any) }], // C? A reference to data that supports this section
        "emptyReason" : { CodeableConcept }, // C? Why the section is empty
        "section" : [{ Content as for Composition.section }] // C? Nested Section
      }]
    },
    {
     "resourceType" : "Consent",
      // from Resource: id, meta, implicitRules, and language
      // from DomainResource: text, contained, extension, and modifierExtension
      "identifier" : [{ Identifier }], // Identifier for this record (external references)
      "status" : "<code>", // R!  draft | proposed | active | rejected | inactive | entered-in-error
      "scope" : { CodeableConcept }, // R!  Which of the four areas this resource covers (extensible)
      "category" : [{ CodeableConcept }], // R!  Classification of the consent statement - for indexing/retrieval
      "patient" : { Reference(Patient) }, // Who the consent applies to
      "dateTime" : "<dateTime>", // When this Consent was created or indexed
      "performer" : [{ Reference(Organization|Patient|Practitioner|RelatedPerson|
       PractitionerRole) }], // Who is agreeing to the policy and rules
      "organization" : [{ Reference(Organization) }], // Custodian of the consent
      // source[x]: Source from which this consent is taken. One of these 2:
      "sourceAttachment" : { Attachment },
      "sourceReference" : { Reference(Consent|DocumentReference|Contract|
       QuestionnaireResponse) },
      "policy" : [{ // Policies covered by this consent
        "authority" : "<uri>", // C? Enforcement source for policy
        "uri" : "<uri>" // C? Specific policy covered by this consent
      }],
      "policyRule" : { CodeableConcept }, // C? Regulation that this consents to
      "verification" : [{ // Consent Verified by patient or family
        "verified" : <boolean>, // R!  Has been verified
        "verifiedWith" : { Reference(Patient|RelatedPerson) }, // Person who verified
        "verificationDate" : "<dateTime>" // When consent verified
      }],
      "provision" : { // Constraints to the base Consent.policyRule
        "type" : "<code>", // deny | permit
        "period" : { Period }, // Timeframe for this rule
        "actor" : [{ // Who|what controlled by this rule (or group, by role)
          "role" : { CodeableConcept }, // R!  How the actor is involved
          "reference" : { Reference(Device|Group|CareTeam|Organization|Patient|
         Practitioner|RelatedPerson|PractitionerRole) } // R!  Resource for the actor (or group, by role)
        }],
        "action" : [{ CodeableConcept }], // Actions controlled by this rule
        "securityLabel" : [{ Coding }], // Security Labels that define affected resources
        "purpose" : [{ Coding }], // Context of activities covered by this rule
        "class" : [{ Coding }], // e.g. Resource Type, Profile, CDA, etc.
        "code" : [{ CodeableConcept }], // e.g. LOINC or SNOMED CT code, etc. in the content
        "dataPeriod" : { Period }, // Timeframe for data controlled by this rule
        "data" : [{ // Data controlled by this rule
          "meaning" : "<code>", // R!  instance | related | dependents | authoredby
          "reference" : { Reference(Any) } // R!  The actual data reference
        }],
        "provision" : [{ Content as for Consent.provision }] // Nested Exception Rules
      }
    }
    ]`;
