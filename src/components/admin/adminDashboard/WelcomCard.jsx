import Welcom from '../../../assets/admin/Welcom.svg'

const WelcomeCard = () => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm flex items-center justify-between flex-nowrap overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Welcome, Principal !
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base w-full md:w-3/4">
          Manage your school operations with ease. Stay updated on academics,
          attendance, finances, and more — all in one place.
        </p>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <img
        src={Welcom}
        alt="illustration"
        className="
          shrink-0
          w-20 sm:w-28 md:w-52
          h-auto
          ml-4
        "
      />

    </div>
  );
};

export default WelcomeCard;