using api.Models;

using FluentValidation;

namespace api.Validators {

    public class TextValidator : AbstractValidator<Text> {
        public TextValidator () {
            RuleFor (t => t.Title)
                .Cascade (CascadeMode.Stop)
                .NotEmpty ().WithMessage ("{PropertyName} should be not empty.")
                .Length (2, 50).WithMessage ("{PropertyName} must be between 2 and 50 characters.");
        }
    }

}
