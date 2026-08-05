export function CompanyWorkplacePolicy() {
    const policies = [
      {
        title: "Equal Opportunity",
        description:
          "BROSAVO provides equal employment opportunities regardless of race, ethnicity, nationality, religion, gender, age, disability, marital status, sexual orientation, or any legally protected characteristic.",
      },
      {
        title: "Respect & Professional Conduct",
        description:
          "Employees are expected to maintain a respectful, inclusive, and collaborative workplace. Harassment, discrimination, bullying, or abusive behavior is not tolerated.",
      },
      {
        title: "Remote & Hybrid Work",
        description:
          "We support flexible work arrangements where business needs allow. Employees are expected to maintain productivity, data security, and professional communication while working remotely.",
      },
      {
        title: "Confidentiality",
        description:
          "Employees must protect confidential business information, customer data, source code, intellectual property, and internal communications both during and after employment.",
      },
      {
        title: "Information Security",
        description:
          "Company devices, software, and cloud services must be used responsibly. Employees must follow security best practices, including strong passwords, multi-factor authentication, and secure handling of customer information.",
      },
      {
        title: "Code of Ethics",
        description:
          "Employees must conduct business honestly, ethically, and in compliance with applicable laws and regulations. Fraudulent, deceptive, or unethical conduct is prohibited.",
      },
      {
        title: "Health & Well-being",
        description:
          "BROSAVO encourages a healthy work-life balance and provides a workplace free from violence, intimidation, or unsafe practices.",
      },
      {
        title: "Compliance",
        description:
          "All employees must comply with company policies, applicable employment laws, privacy regulations, and contractual obligations.",
      },
      {
        title: "Policy Updates",
        description:
          "These workplace policies may be updated periodically to reflect legal, operational, or organizational changes. Continued employment constitutes acceptance of the latest version.",
      },
    ];
  
    return (
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Company Policy
            </span>
  
            <h2 className="mt-3 text-4xl font-bold">
              Workplace Policy
            </h2>
  
            <p className="mt-4 text-muted-foreground">
              BROSAVO is committed to maintaining a professional,
              inclusive, secure, and respectful workplace for all employees,
              contractors, interns, and business partners.
            </p>
          </div>
  
          <div className="space-y-8">
            {policies.map((policy) => (
              <div key={policy.title}>
                <h3 className="text-xl font-semibold">
                  {policy.title}
                </h3>
  
                <p className="mt-2 leading-7 text-muted-foreground">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }