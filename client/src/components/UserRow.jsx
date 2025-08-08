// src/components/UserRow.jsx
const UserRow = ({ user, refetch }) => {
  const handleRoleChange = async (newRole) => {
    try {
      const res = await fetch(`/user/role/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access-token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        refetch();
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <select
          className="select select-bordered select-sm"
          value={user.role}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="tour-guide">Tour Guide</option>
          <option value="tourist">Tourist</option>
        </select>
      </td>
      <td>
        {/* Add any action buttons here */}
      </td>
    </tr>
  );
};

export default UserRow;