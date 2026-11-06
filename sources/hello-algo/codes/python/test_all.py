import os
import glob
import subprocess

env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

if __name__ == "__main__":
    # أوجد ملفات الشيفرة المصدرية
    src_paths = sorted(glob.glob("chapter_*/*.py"))
    errors = []

    # شغّل شيفرة Python
    for src_path in src_paths:
        process = subprocess.Popen(
            ["python", src_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            env=env,
            encoding='utf-8'
        )
        # انتظر انتهاء العملية واجمع رسائل مخارجها وأخطائها
        stdout, stderr = process.communicate()
        # تحقق من حالة الخروج
        exit_status = process.returncode
        if exit_status != 0:
            errors.append(stderr)

    print(f"Tested {len(src_paths)} files")
    print(f"Found exceptions in {len(errors)} files")
    if len(errors) > 0:
        raise RuntimeError("\n\n".join(errors))
