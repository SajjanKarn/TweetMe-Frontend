import styles from "@/styles/ProfileCard.module.css";
import CustomButton from "./CustomButton";

export default function ProfileCard({ user }) {
  return (
    <div className="card" className={styles.box_card}>
      <h4 className="card-title text-center py-2">Your Profile</h4>
      <div className="card-body">
        <p>
          <i className="fa fa-user-circle-o" aria-hidden="true"></i> Username:{" "}
          <strong>{user.username}</strong>
        </p>
        <p>
          <i className="fa fa-address-book" aria-hidden="true"></i> Name:{" "}
          <strong>{user.fullname.toUpperCase()}</strong>
        </p>
        <p>
          <i className="fa fa-envelope" aria-hidden="true"></i> Email:{" "}
          <strong>{user.email}</strong>
        </p>
        {/* <CustomButton href="#">
          <i className="fa fa-cog" aria-hidden="true"></i>
          {"   "}Edit Profile
        </CustomButton> */}
      </div>
    </div>
  );
}
