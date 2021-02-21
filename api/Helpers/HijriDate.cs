using System;
using System.Globalization;
using System.Text;

namespace api.Helpers {
    public static class HijriDate {
        public static string GetHijriDate () {

            var currentTime = DateTime.Now;

            var hijriCalendar = new HijriCalendar ();

            var year = hijriCalendar.GetYear (currentTime).ToString ();
            var month = hijriCalendar.GetMonth (currentTime).ToString ();
            var day = hijriCalendar.GetDayOfMonth (currentTime).ToString ();
            var weekday = hijriCalendar.GetDayOfWeek (currentTime).ToString ();

            var nameOfDay = GetNameOfDay (weekday);
            var nameOfMonth = GetNameOfMonth (month);
            var arabicYear = ToArabicNumber (year);
            var arabicDay = ToArabicNumber (day);

            var date = $"{nameOfDay} {arabicDay} {nameOfMonth} {arabicYear}";

            return date;

        }

        private static string GetNameOfMonth (string monthNumber) {

            var nameOfMonth = "";

            switch (monthNumber) {
            case "1":
                nameOfMonth = "ٱلْمُحَرَّم‎";
                break;
            case "2":
                nameOfMonth = "صَفَر‎";
                break;
            case "3":
                nameOfMonth = "رَبِيع ٱلْأَوَّل";
                break;
            case "4":
                nameOfMonth = "رَبِيع ٱلثَّانِي";
                break;
            case "5":
                nameOfMonth = "جُمَادَىٰ ٱلْأُولَىٰ";
                break;
            case "6":
                nameOfMonth = "جُمَادَىٰ ٱلثَّانِيَة";
                break;
            case "7":
                nameOfMonth = "رَجَب";
                break;
            case "8":
                nameOfMonth = "شَعْبَان";
                break;
            case "9":
                nameOfMonth = "رَمَضَان";
                break;
            case "10":
                nameOfMonth = "شَوَّال";
                break;
            case "11":
                nameOfMonth = "ذُو ٱلْقَعْدَة";
                break;
            case "12":
                nameOfMonth = "ذُو ٱلْحِجَّة";
                break;
            }

            return nameOfMonth;

        }

        private static string GetNameOfDay (string dayNumber) {

            var nameOfDay = "";

            switch (dayNumber) {
            case "Sunday":
                nameOfDay = "ٱلْأَحَد‎";
                break;
            case "Monday":
                nameOfDay = "الاِثْنَيْن‎";
                break;
            case "Tuesday":
                nameOfDay = "ٱلثُّلَاثَاء‎";
                break;
            case "Wednesday":
                nameOfDay = "ٱلْأَرْبِعَاء‎";
                break;
            case "Thursday":
                nameOfDay = "ٱلْخَمِيس‎";
                break;
            case "Friday":
                nameOfDay = "ٱلْجُمْعَة‎";
                break;
            case "Saturday":
                nameOfDay = "ٱلسَّبْت‎";
                break;

            }

            return nameOfDay;
        }

        private static string ToArabicNumber (string inputString) {
            string[] arabicDigits = CultureInfo.GetCultureInfo ("ar-SA").NumberFormat.NativeDigits;
            var arabicNumberBuilder = new StringBuilder ();
            foreach (char character in inputString) {
                if (char.IsDigit (character))
                    arabicNumberBuilder.Append (arabicDigits[int.Parse (character.ToString ())]);
                else
                    arabicNumberBuilder.Append (character);
            }
            return arabicNumberBuilder.ToString ();
        }
    }
}
