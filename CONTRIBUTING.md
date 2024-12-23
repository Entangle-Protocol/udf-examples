# Contributing to price oracle solana

First off, thanks for taking the time to contribute! ❤️

All types of contributions are highly appreciated. See the [Table of Contents](#table-of-contents) for different ways
to help and details about how this project handles them. Please make sure to read the relevant section before making
your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The
community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support
> the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Improving The Documentation](#improving-the-documentation)
- [Commit Messages](#commit-messages)

## Code of Conduct :police_car:

This project and everyone participating in it is governed by the
[Entangle Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to .

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](https://docs.entangle.fi/).

Before you ask a question, it is best to search for existing [Issues](https://github.com/Entangle-Protocol/udf-examples/blob/main/README.md)
that might help you. In case you have found a suitable issue and still need clarification, you can write your question
in this issue.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/Entangle-Protocol/solana-tools/issues/new).
- Choose the "question" label.
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the
> necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to
investigate carefully, collect information and describe the issue in detail in your report. Please complete the
following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment
  components/versions (Make sure that you have read the [documentation](https://docs.entangle.fi/). If you are looking for support,
  you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there
  is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/Entangle-Protocol/udf-examples/issues).
- Collect information about the bug:
- Stack trace (Traceback)
- OS, Platform and Version (Windows, Linux, macOS)
- Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
- Possibly your input and the output
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue
> tracker, or elsewhere in public. Instead, sensitive bugs must be sent by email
> to [t.security@entangle.fi](t.security@entangle.fi) with high priority notice.

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/Entangle-Protocol/udf-examples/issues/new). (Since we can't be sure at this point whether it is a bug
  or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to
  recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem
  and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no
  obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs
  with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such
  as `critical`)

#### Template for bug report

> ##### Bug Report
>
> ##### Before Submitting a Bug Report
>
> - :white_check_mark: I have checked that I am using the latest version.
> - :white_check_mark: I have read the documentation and made sure that the issue is not caused by an individual
    configuration.
> - :white_check_mark: I have searched the existing bug tracker to see if the issue has already been reported.
>
> ##### Bug Description
>
> Please provide a clear and concise description of the bug.
>
> ##### Steps to Reproduce
>
> Please provide step-by-step instructions on how to reproduce the bug:
>
> 1. Step 1
> 2. Step 2
> 3. Step 3
>
> ##### Expected Behavior
>
> Please describe what you expected to happen.
>
> ##### Actual Behavior
>
> Please describe what actually happened.
>
> ##### Additional Information
>
> Please provide any additional information that might be helpful in resolving the issue, such as:
>
> - Stack trace (Traceback)
> - OS, Platform, and Version
> - Version of the interpreter, compiler, SDK, runtime environment, package manager, etc.
> - Input and output examples
> - Reproduction with older versions (if applicable)
>
> ##### Security Notice
>
> Please note that security-related issues, vulnerabilities, or bugs containing sensitive information should not be
> reported in the issue tracker. > > Instead, send them by email to t.security@entangle.fi with high priority notice.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Trillion, **including completely new features
and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community
to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://docs.entangle.fi/universal-data-feeds-guides/how-to-integrate) carefully and find out if the functionality is already covered, maybe by an
  individual configuration.
- Perform a [search](https://github.com/Entangle-Protocol/udf-examples/issues/new) to see if the enhancement has already been suggested. If it
  has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to
  convince the project's developers of the merits of this feature.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/Entangle-Protocol/udf-examples/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point
  you can also tell which alternatives do not work for you.
- **Explain why this enhancement would be useful** to most Trillion users. You may also want to point out the other
  projects that solved it better and which could serve as inspiration.

#### Template for submitting an enhancement

> ##### Enhancement proposal
>
> ##### Description
>
> Please provide a clear and concise description of the enhancement you are suggesting.
>
> ##### Current Behavior
>
> Please describe the current behavior or functionality that you would like to see improved.
>
> ##### Expected Behavior
>
> Please describe the behavior or functionality you expect to see after the enhancement is implemented.
>
> ##### Steps to Reproduce (if applicable)
>
> If there are specific steps to reproduce the issue or scenario where the enhancement would be beneficial, please
> provide them here.
>
> 1. Step 1
> 2. Step 2
> 3. Step 3
>
> ##### Alternatives Considered (if applicable)
>
> If you have considered any alternatives to the suggested enhancement, please describe them here and explain why they
> are not suitable.
>
> ##### Usefulness to Users
>
> Please explain why this enhancement would be useful to most users of the project. You may also reference other
> projects that have implemented similar enhancements.
>
> ##### Additional Information
>
> Please provide any additional information or context that might be helpful in understanding and implementing the
> enhancement.

### Your First Code Contribution

All setup information are included in [Readme](https://github.com/Entangle-Protocol/udf-examples/blob/main/README.md), setup section.

1. Create a fork.
2. Make an enhancement or bug fix.
3. Create a pull request with a templates above(if it is related to bug, use bug report template, if it is enhancement,
   use template for this purpose)

#### Commit Messages

Commit message should consist of 3 parts:

1. Type of commit(for all commits produced by contributing mechanism should start with CC(Comunity commit))
2. Type of commit. There 3 basic types:
   a. feat - for new features
   b. bug - for bug fixing
   c. enh - for enhancements of existing code(should be much smaller than feature)
3. Short name e.g "Stake USDT"

So, example will be following: git commit -m "CC enh: MerchantMoeSynthChef gas optimization"

### Improving The Documentation

If you want to improve [Documentation](https://github.com/Entangle-Protocol/udf-examples/blob/main/README.md), please open an issue with a title "Documentation enhancement" and
describe what you want to improve with as many details as possible. You can even propose to improve this file or README.md, if so, still write
as title "Documentation enhancement"
