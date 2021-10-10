using api.Models;
using FluentValidation;

namespace api.Validators
{
    public class MailValidator : AbstractValidator<Mail>
    {
        public MailValidator()
        {
            RuleFor(t => t.Sender)
                .Cascade(CascadeMode.Stop)
                .EmailAddress().WithMessage("{PropertyName} has to be an email address.")
                .NotEmpty().WithMessage("{PropertyName} has to be an email address.");
            RuleFor(t => t.Body)
                .Length(5, 5000).WithMessage(" { PropertyName } has to between 5 and 5000 characters.");
        }
    }
}